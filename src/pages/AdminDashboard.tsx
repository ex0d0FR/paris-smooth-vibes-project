
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
import NavigationMenu from '@/components/NavigationMenu';

type UserRole = 'dev' | 'admin' | 'team_leader' | 'volunteer' | 'guest';

interface UserWithProfile {
  user_id: string;
  email: string | null;
  username: string | null;
  created_at: string;
  roles: UserRole[];
  primary_role: UserRole;
  is_active: boolean;
  phone_number?: string | null;
  city?: string | null;
  country?: string | null;
  church_name?: string | null;
  account_status?: 'pending' | 'approved' | 'denied';
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
      // Get profiles with extended fields - admins can see all data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, username, email, phone_number, city, country, church_name, account_status, is_active, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role, is_active')
        .eq('is_active', true);

      if (rolesError) throw rolesError;

      // Combine the data
      const usersWithRoles: UserWithProfile[] = (profiles || []).map(profile => {
        const roles = (userRoles || [])
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
          email: profile.email || null,
          username: profile.username,
          created_at: profile.created_at,
          roles,
          primary_role: getPrimaryRole(roles),
          is_active: profile.is_active ?? true,
          phone_number: profile.phone_number || null,
          city: profile.city || null,
          country: profile.country || null,
          church_name: profile.church_name || null,
          account_status: (profile.account_status as 'pending' | 'approved' | 'denied') || 'pending',
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

  const handleApprove = async (user: UserWithProfile) => {
    const { error } = await supabase.rpc('admin_set_user_access', {
      _user_id: user.user_id,
      _status: 'approved',
    });
    if (error) {
      console.error('Approve error:', error);
      toast({
        title: 'Error',
        description: 'Could not approve user.',
        variant: 'destructive',
      });
      return;
    }
    toast({ title: 'Approved', description: 'User approved successfully.' });
    await fetchUsers();
  };

  const handleDeny = async (user: UserWithProfile) => {
    const { error } = await supabase.rpc('admin_set_user_access', {
      _user_id: user.user_id,
      _status: 'denied',
    });
    if (error) {
      console.error('Deny error:', error);
      toast({
        title: 'Error',
        description: 'Could not deny user.',
        variant: 'destructive',
      });
      return;
    }
    toast({ title: 'Denied', description: 'User access denied.' });
    await fetchUsers();
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
    <div className="min-h-screen bg-background">
      <NavigationMenu />
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users and roles ({userRole === 'dev' ? 'Developer' : 'Administrator'})
            </p>
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
              onApprove={handleApprove}
              onDeny={handleDeny}
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
    </div>
  );
};

export default AdminDashboard;
