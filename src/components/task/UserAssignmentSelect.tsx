import React, { useState, useEffect } from 'react';
import { User, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  username?: string;
  avatar_url?: string;
  role?: string;
}

interface UserAssignmentSelectProps {
  value?: string;
  onValueChange: (userId?: string) => void;
  placeholder?: string;
  roleFilter?: string[];
  boardId?: string;
}

const UserAssignmentSelect: React.FC<UserAssignmentSelectProps> = ({
  value,
  onValueChange,
  placeholder = "Assign to...",
  roleFilter = ['volunteer', 'team_leader'],
  boardId
}) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, boardId]);

  const fetchUsers = async () => {
    try {
      // Fetch users with roles
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .eq('is_active', true)
        .in('role', roleFilter as any);

      if (roleError) throw roleError;

      // Fetch profiles for these users
      const userProfiles = await Promise.all(
        (roleData || []).map(async (roleItem) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', roleItem.user_id)
            .single();
          
          return profile ? {
            ...profile,
            role: roleItem.role
          } : null;
        })
      );

      // If boardId is provided, also include users assigned to this board
      let boardUsers: UserProfile[] = [];
      if (boardId) {
        const { data: boardAssignments } = await supabase
          .from('board_assignments')
          .select('user_id')
          .eq('board_id', boardId);

        const boardProfiles = await Promise.all(
          (boardAssignments || []).map(async (assignment) => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', assignment.user_id)
              .single();
            
            return profile ? {
              ...profile,
              role: 'assigned'
            } : null;
          })
        );

        boardUsers = boardProfiles.filter(Boolean) as UserProfile[];
      }

      // Combine and deduplicate users
      const allUsers = [...userProfiles.filter(Boolean) as UserProfile[], ...boardUsers];
      const uniqueUsers = allUsers.reduce((acc, user) => {
        if (!acc.find(u => u.id === user.id)) {
          acc.push(user);
        }
        return acc;
      }, [] as UserProfile[]);

      setUsers(uniqueUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'team_leader':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'volunteer':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'assigned':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const selectedUser = users.find(user => user.id === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue>
          {selectedUser ? (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{selectedUser.username || 'Unknown User'}</span>
              <Badge className={`text-xs ${getRoleBadgeColor(selectedUser.role || '')}`}>
                {selectedUser.role?.replace('_', ' ')}
              </Badge>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              {placeholder}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {!value && (
          <SelectItem value="">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              Unassigned
            </div>
          </SelectItem>
        )}
        {loading ? (
          <SelectItem value="loading" disabled>Loading users...</SelectItem>
        ) : users.length === 0 ? (
          <SelectItem value="no-users" disabled>No users available</SelectItem>
        ) : (
          users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{user.username || 'Unknown User'}</span>
                <Badge className={`text-xs ${getRoleBadgeColor(user.role || '')}`}>
                  {user.role?.replace('_', ' ')}
                </Badge>
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default UserAssignmentSelect;