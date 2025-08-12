
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Settings, Calendar, CheckCircle2, Ban } from 'lucide-react';

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

interface UserManagementTableProps {
  users: UserWithProfile[];
  currentUserRole: UserRole | null;
  onRoleAssignment: (user: UserWithProfile) => void;
  onApprove: (user: UserWithProfile) => void;
  onDeny: (user: UserWithProfile) => void;
}

const UserManagementTable = ({ users, currentUserRole, onRoleAssignment, onApprove, onDeny }: UserManagementTableProps) => {
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

  const canManageUser = (targetRole: UserRole) => {
    if (currentUserRole === 'dev') return true;
    if (currentUserRole === 'admin') {
      return !['dev', 'admin'].includes(targetRole);
    }
    return false;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Primary Role</TableHead>
            <TableHead>All Roles</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell>
                <div className="font-medium">
                  {user.username || 'No username'}
                </div>
                {user.church_name && (
                  <div className="text-xs text-muted-foreground">{user.church_name}</div>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.email || '—'}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.phone_number || '—'}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {[user.city, user.country].filter(Boolean).join(', ') || '—'}
              </TableCell>
              <TableCell>
                <Badge className={getRoleColor(user.primary_role)}>
                  {getRoleDisplayName(user.primary_role)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {user.roles.map((role, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className={`text-xs ${getRoleColor(role)}`}
                    >
                      {getRoleDisplayName(role)}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {user.account_status || 'pending'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(user.created_at).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="space-x-2">
                {canManageUser(user.primary_role) && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRoleAssignment(user)}
                      className="inline-flex items-center gap-1"
                    >
                      <Settings className="h-3 w-3" />
                      Manage
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onApprove(user)}
                      disabled={user.account_status === 'approved'}
                      className="inline-flex items-center gap-1"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeny(user)}
                      disabled={user.account_status === 'denied'}
                      className="inline-flex items-center gap-1"
                    >
                      <Ban className="h-3 w-3" />
                      Deny
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagementTable;
