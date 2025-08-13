import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type UserRole = 'dev' | 'admin' | 'team_leader' | 'volunteer' | 'guest';

interface UserProfile {
  user_id: string;
  username: string | null;
  avatar_url: string | null;
}

interface UserAssignmentSelectProps {
  onSelect: (user: UserProfile) => void;
  selectedUser?: UserProfile | null;
}

const UserAssignmentSelect = ({ onSelect, selectedUser }: UserAssignmentSelectProps) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailableUsers();
  }, []);

  const fetchAvailableUsers = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      // Get current user's role to determine access level
      const { data: currentRole } = await supabase
        .rpc('get_user_primary_role', { _user_id: session.user.id });

      let availableUsers: UserProfile[] = [];

      if (currentRole === 'dev' || currentRole === 'admin') {
        // Admins can see all users, but only basic info for assignment
        const { data: allUsers, error } = await supabase
          .from('profiles')
          .select('user_id, username, avatar_url')
          .eq('is_active', true)
          .eq('account_status', 'approved');

        if (!error && allUsers) {
          availableUsers = allUsers;
        }
      } else if (currentRole === 'team_leader') {
        // Team leaders can only assign to users they manage or collaborators
        // Get users from board assignments where current user is the assigner
        const { data: assignments, error: assignmentsError } = await supabase
          .from('board_assignments')
          .select('user_id')
          .eq('assigned_by', session.user.id);

        if (!assignmentsError && assignments?.length) {
          const userIds = assignments.map(a => a.user_id);
          
          // Use secure function to get basic info for these users
          const collaboratorData = await Promise.all(
            userIds.map(async (userId) => {
              const { data } = await supabase
                .rpc('get_collaborator_info', { _user_id: userId });
              return data?.[0];
            })
          );

          availableUsers = collaboratorData
            .filter(Boolean)
            .map(user => ({
              user_id: user.user_id,
              username: user.username,
              avatar_url: user.avatar_url
            }));
        }
      }

      setUsers(availableUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      value={selectedUser?.user_id || ''}
      onValueChange={(userId) => {
        const user = users.find(u => u.user_id === userId);
        if (user) onSelect(user);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue 
          placeholder={loading ? "Loading users..." : "Select a user to assign"}
        />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.user_id} value={user.user_id}>
            <div className="flex items-center gap-2">
              {user.avatar_url && (
                <img 
                  src={user.avatar_url} 
                  alt="Avatar" 
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span>{user.username || 'Unknown User'}</span>
            </div>
          </SelectItem>
        ))}
        {users.length === 0 && !loading && (
          <SelectItem value="" disabled>
            No users available for assignment
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default UserAssignmentSelect;