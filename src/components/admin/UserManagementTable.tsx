
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
import { Settings, Calendar } from 'lucide-react';

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

interface UserManagementTableProps {
  users: UserWithProfile[];
  currentUserRole: UserRole | null;
  onRoleAssignment: (user: UserWithProfile) => void;
}

const UserManagementTable = ({ users, currentUserRole, onRoleAssignment }: UserManagementTableProps) => {
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
            <TableHead>Primary Role</TableHead>
            <TableHead>All Roles</TableHead>
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
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.email}
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
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(user.created_at).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>
                {canManageUser(user.primary_role) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRoleAssignment(user)}
                    className="flex items-center gap-1"
                  >
                    <Settings className="h-3 w-3" />
                    Manage
                  </Button>
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
