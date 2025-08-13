
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, LogOut, Settings, Users, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NavigationMenu from '@/components/NavigationMenu';
import ProfileSetupForm from '@/components/profile/ProfileSetupForm';

type UserRole = 'dev' | 'admin' | 'team_leader' | 'volunteer' | 'guest';

interface UserProfile {
  id: string;
  user_id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  // Added optional extended fields
  phone_number?: string | null;
  city?: string | null;
  country?: string | null;
  church_name?: string | null;
  email?: string | null;
  is_active?: boolean | null;
  account_status?: 'pending' | 'approved' | 'denied';
}

interface UserRoleData {
  role: UserRole;
  assigned_at: string;
  is_active: boolean;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRoles, setUserRoles] = useState<UserRoleData[]>([]);
  const [primaryRole, setPrimaryRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      await fetchUserData(session.user.id);
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/auth');
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile - use maybeSingle() to avoid error when no profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (profileError) throw profileError;
      
      // If no profile exists, we'll handle this in the UI
      if (!profileData) {
        setProfile(null);
        setLoading(false);
        return;
      }
      
      setProfile(profileData as UserProfile);

      // Fetch user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role, assigned_at, is_active')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (rolesError) throw rolesError;
      setUserRoles(rolesData || []);

      // Get primary role using the database function
      const { data: primaryRoleData, error: primaryRoleError } = await supabase
        .rpc('get_user_primary_role', { _user_id: userId });

      if (!primaryRoleError && primaryRoleData) {
        setPrimaryRole(primaryRoleData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Only show toast error for actual database errors, not missing profile
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const getRoleColor = (role: UserRole) => {
    const colors = {
      dev: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      team_leader: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      volunteer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      guest: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };
    return colors[role] || colors.guest;
  };

  const getRoleDisplayName = (role: UserRole) => {
    const names = {
      dev: 'Developer',
      admin: 'Administrator',
      team_leader: 'Team Leader',
      volunteer: 'Volunteer',
      guest: 'Guest'
    };
    return names[role] || 'Guest';
  };

  const isProfileIncomplete = !!profile && (!profile.phone_number || !profile.city || !profile.country);
  const status = profile?.account_status || 'pending';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Registration Incomplete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your account needs to complete the registration process. Please register to create your profile.
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={() => navigate('/auth')} variant="default">
                Complete Registration
              </Button>
              <Button onClick={() => navigate('/')} variant="outline">
                Go to Home Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationMenu />
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">User Profile</h1>
          </div>

          {(isProfileIncomplete || status === 'pending') && (
            <Card className="mb-6 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-yellow-600" />
                  Complete your registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Please provide your phone number, city and country so an admin can verify your account.
                </p>
                <ProfileSetupForm
                  userId={user.id}
                  initialValues={{
                    phone_number: profile.phone_number ?? '',
                    city: profile.city ?? '',
                    country: profile.country ?? '',
                    church_name: profile.church_name ?? '',
                  }}
                  onCompleted={() => fetchUserData(user.id)}
                />
                <div className="text-xs text-muted-foreground">
                  Current status: <span className="font-medium capitalize">{status}</span>
                </div>
              </CardContent>
            </Card>
          )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback>
                    {profile.username?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {profile.username || 'No username set'}
                  </h3>
                  <p className="text-muted-foreground">{profile.email || user.email}</p>
                </div>
              </div>

              {profile.phone_number && (
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-sm text-muted-foreground">{profile.phone_number}</p>
                </div>
              )}

              {(profile.city || profile.country) && (
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-sm text-muted-foreground">
                    {[profile.city, profile.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}

              {profile.church_name && (
                <div>
                  <h4 className="font-medium mb-1">Church</h4>
                  <p className="text-sm text-muted-foreground">{profile.church_name}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-1">Account Status</h4>
                <Badge variant="outline" className="capitalize">
                  {status}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-1">Account Created</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>

              {primaryRole && (
                <div>
                  <h4 className="font-medium mb-2">Primary Role</h4>
                  <Badge className={getRoleColor(primaryRole)}>
                    {getRoleDisplayName(primaryRole)}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Assigned Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userRoles.length > 0 ? (
                <div className="space-y-3">
                  {userRoles.map((roleData, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <Badge className={getRoleColor(roleData.role)}>
                          {getRoleDisplayName(roleData.role)}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Assigned: {new Date(roleData.assigned_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {roleData.is_active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No roles assigned</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Role-specific content */}
        {primaryRole && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Role Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              {primaryRole === 'dev' && (
                <div className="text-center p-6">
                  <h3 className="text-lg font-semibold mb-2">Developer Dashboard</h3>
                  <p className="text-muted-foreground">Welcome to the developer area. You have full system access.</p>
                </div>
              )}
              {primaryRole === 'admin' && (
                <div className="text-center p-6">
                  <h3 className="text-lg font-semibold mb-2">Administrator Dashboard</h3>
                  <p className="text-muted-foreground">Welcome to the admin area. You can manage users and system settings.</p>
                </div>
              )}
              {primaryRole === 'team_leader' && (
                <div className="text-center p-6">
                  <h3 className="text-lg font-semibold mb-2">Team Leader Dashboard</h3>
                  <p className="text-muted-foreground">Welcome to the team leader area. You can manage your team and projects.</p>
                </div>
              )}
              {primaryRole === 'volunteer' && (
                <div className="text-center p-6">
                  <h3 className="text-lg font-semibold mb-2">Volunteer Dashboard</h3>
                  <p className="text-muted-foreground">Welcome to the volunteer area. Check your assignments and tasks.</p>
                </div>
              )}
              {primaryRole === 'guest' && (
                <div className="text-center p-6">
                  <h3 className="text-lg font-semibold mb-2">Guest Area</h3>
                  <p className="text-muted-foreground">Welcome! Your account is pending role assignment. Please complete your registration details above and wait for admin approval.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
