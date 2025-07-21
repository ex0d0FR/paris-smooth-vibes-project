
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
      console.log('Fetching users with role filter:', roleFilter);
      
      // Fetch users with roles by joining with auth.users to ensure they exist
      const { data: usersWithRoles, error: usersError } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          profiles!inner (
            user_id,
            username,
            avatar_url
          )
        `)
        .eq('is_active', true)
        .in('role', roleFilter as any);

      if (usersError) {
        console.error('Error fetching users with roles:', usersError);
        throw usersError;
      }

      console.log('Users with roles fetched:', usersWithRoles);

      // Transform the data to match our interface
      const roleUsers: UserProfile[] = (usersWithRoles || [])
        .filter(item => item.profiles && item.user_id) // Ensure valid data
        .map(item => ({
          id: item.user_id,
          username: item.profiles.username,
          avatar_url: item.profiles.avatar_url,
          role: item.role
        }));

      // If boardId is provided, also include users assigned to this board
      let boardUsers: UserProfile[] = [];
      if (boardId) {
        const { data: boardAssignments, error: boardError } = await supabase
          .from('board_assignments')
          .select(`
            user_id,
            profiles!inner (
              user_id,
              username,
              avatar_url
            )
          `)
          .eq('board_id', boardId);

        if (boardError) {
          console.error('Error fetching board assignments:', boardError);
        } else {
          boardUsers = (boardAssignments || [])
            .filter(assignment => assignment.profiles && assignment.user_id)
            .map(assignment => ({
              id: assignment.user_id,
              username: assignment.profiles.username,
              avatar_url: assignment.profiles.avatar_url,
              role: 'assigned'
            }));
        }
      }

      // Combine and deduplicate users
      const allUsers = [...roleUsers, ...boardUsers];
      const uniqueUsers = allUsers.reduce((acc, user) => {
        if (!acc.find(u => u.id === user.id) && user.id) { // Ensure ID exists
          acc.push(user);
        }
        return acc;
      }, [] as UserProfile[]);

      console.log('Final users list:', uniqueUsers);
      setUsers(uniqueUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
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

  const handleValueChange = (selectedValue: string) => {
    console.log('Selected value:', selectedValue);
    if (selectedValue === "" || selectedValue === "loading" || selectedValue === "no-users") {
      onValueChange(undefined);
    } else {
      // Validate that the selected user exists in our users list
      const selectedUser = users.find(user => user.id === selectedValue);
      if (selectedUser) {
        onValueChange(selectedValue);
      } else {
        console.error('Selected user not found in users list:', selectedValue);
        onValueChange(undefined);
      }
    }
  };

  const selectedUser = users.find(user => user.id === value);

  return (
    <Select value={value} onValueChange={handleValueChange}>
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
