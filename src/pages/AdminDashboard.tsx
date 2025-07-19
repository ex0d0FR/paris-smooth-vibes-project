
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Users, Shield, UserCheck, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import UserManagementTable from '@/components/admin/UserManagementTable';
import RoleAssignmentModal from '@/components/admin/RoleAssignmentModal';
import UserStatsCards from '@/components/admin/UserStatsCards';

type UserRole = 'dev' | 'admin' | 'team_leader' | 'volunteer' | 'guest';

interface UserWithProfile {
  user_id: string;
  email: string;
  username: string | null;
  created_at: string;
  roles: UserRole[];
  primary_role: UserRole;
  is_active: boolean;
}

const AdminDashboard = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      setCurrentUser(session.user);

      // Get user's primary role
      const { data: primaryRole } = await supabase
        .rpc('get_user_primary_role', { _user_id: session.user.id });

      if (!primaryRole || (primaryRole !== 'dev' && primaryRole !== 'admin')) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive",
        });
        navigate('/profile');
        return;
      }

      setUserRole(primaryRole);
      await fetchUsers();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      // Get all profiles with user data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, username, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role, is_active')
        .eq('is_active', true);

      if (rolesError) throw rolesError;

      // Combine the data
      const usersWithRoles: UserWithProfile[] = profiles.map(profile => {
        const roles = userRoles
          .filter(role => role.user_id === profile.user_id)
          .map(role => role.role as UserRole);
        
        // Get primary role using hierarchy
        const getPrimaryRole = (roles: UserRole[]): UserRole => {
          const hierarchy: UserRole[] = ['dev', 'admin', 'team_leader', 'volunteer', 'guest'];
          for (const role of hierarchy) {
            if (roles.includes(role)) return role;
          }
          return 'guest';
        };

        return {
          user_id: profile.user_id,
          email: profile.username || 'No email',
          username: profile.username,
          created_at: profile.created_at,
          roles,
          primary_role: getPrimaryRole(roles),
          is_active: true
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users data",
        variant: "destructive",
      });
    }
  };

  const handleRoleAssignment = (user: UserWithProfile) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  const handleRoleUpdate = async () => {
    await fetchUsers();
    setIsRoleModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users and roles ({userRole === 'dev' ? 'Developer' : 'Administrator'})
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/profile')}>
              My Profile
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>

        <UserStatsCards users={users} />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserManagementTable 
              users={users}
              currentUserRole={userRole}
              onRoleAssignment={handleRoleAssignment}
            />
          </CardContent>
        </Card>

        {selectedUser && (
          <RoleAssignmentModal
            isOpen={isRoleModalOpen}
            onClose={() => {
              setIsRoleModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
            currentUserRole={userRole}
            onRoleUpdate={handleRoleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
