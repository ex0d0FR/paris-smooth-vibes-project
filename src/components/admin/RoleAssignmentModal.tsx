
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type UserRole = 'dev' | 'admin' | 'team_leader' | 'volunteer' | 'guest';

interface UserWithProfile {
  user_id: string;
  email: string;
  username: string | null;
  roles: UserRole[];
  primary_role: UserRole;
}

interface RoleAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserWithProfile;
  currentUserRole: UserRole | null;
  onRoleUpdate: () => void;
}

const RoleAssignmentModal = ({ 
  isOpen, 
  onClose, 
  user, 
  currentUserRole, 
  onRoleUpdate 
}: RoleAssignmentModalProps) => {
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(user.roles);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const availableRoles: { role: UserRole; label: string; description: string }[] = [
    { role: 'dev', label: 'Developer', description: 'Full system access (super admin)' },
    { role: 'admin', label: 'Administrator', description: 'Can manage users and assign roles' },
    { role: 'team_leader', label: 'Team Leader', description: 'Can manage volunteers and teams' },
    { role: 'volunteer', label: 'Volunteer', description: 'Basic access with assignments' },
    { role: 'guest', label: 'Guest', description: 'Limited access, pending approval' }
  ];

  const canAssignRole = (role: UserRole) => {
    if (currentUserRole === 'dev') return true;
    if (currentUserRole === 'admin') {
      return !['dev', 'admin'].includes(role);
    }
    return false;
  };

  const handleRoleToggle = (role: UserRole, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, role]);
    } else {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    }
  };

  const handleSaveRoles = async () => {
    setLoading(true);
    try {
      // First, deactivate all current roles for this user
      const { error: deactivateError } = await supabase
        .from('user_roles')
        .update({ is_active: false })
        .eq('user_id', user.user_id);

      if (deactivateError) throw deactivateError;

      // Then, insert new active roles
      if (selectedRoles.length > 0) {
        const rolesToInsert = selectedRoles.map(role => ({
          user_id: user.user_id,
          role: role,
          assigned_by: currentUserRole === 'dev' || currentUserRole === 'admin' ? null : null,
          is_active: true
        }));

        const { error: insertError } = await supabase
          .from('user_roles')
          .upsert(rolesToInsert, { 
            onConflict: 'user_id,role',
            ignoreDuplicates: false 
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "Success",
        description: "User roles updated successfully",
        variant: "default",
      });

      onRoleUpdate();
    } catch (error: any) {
      console.error('Error updating roles:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update user roles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage User Roles</DialogTitle>
          <DialogDescription>
            Assign roles to {user.username || user.email}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Current Roles:</h4>
            <div className="flex flex-wrap gap-1">
              {user.roles.map((role) => (
                <Badge key={role} className={getRoleColor(role)}>
                  {availableRoles.find(r => r.role === role)?.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Assign New Roles:</h4>
            <div className="space-y-3">
              {availableRoles.map((roleOption) => (
                <div key={roleOption.role} className="flex items-start space-x-3">
                  <Checkbox
                    id={roleOption.role}
                    checked={selectedRoles.includes(roleOption.role)}
                    onCheckedChange={(checked) => 
                      handleRoleToggle(roleOption.role, checked as boolean)
                    }
                    disabled={!canAssignRole(roleOption.role)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={roleOption.role}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        !canAssignRole(roleOption.role) ? 'text-muted-foreground' : ''
                      }`}
                    >
                      {roleOption.label}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {roleOption.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSaveRoles}
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleAssignmentModal;
