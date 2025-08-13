import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecurityEvent {
  event_type: 'failed_authorization' | 'role_assignment' | 'suspicious_activity';
  details: Record<string, any>;
  user_id?: string;
}

export const useSecurityMonitoring = () => {
  const { toast } = useToast();

  const logSecurityEvent = async (event: SecurityEvent) => {
    try {
      // Log to console for now (could be extended to external service)
      console.warn('Security Event:', {
        timestamp: new Date().toISOString(),
        ...event
      });

      // For critical events, show a toast notification
      if (event.event_type === 'failed_authorization') {
        toast({
          title: "Access Denied",
          description: "You don't have permission to perform this action.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  const checkRoleAssignmentAttempt = async (targetUserId: string, roles: string[]) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return false;

      // Get current user's role
      const { data: currentRole } = await supabase
        .rpc('get_user_primary_role', { _user_id: session.user.id });

      // Check if user can assign these roles
      const canAssign = (
        currentRole === 'dev' || 
        currentRole === 'admin' ||
        (currentRole === 'team_leader' && !roles.some(r => ['dev', 'admin'].includes(r)))
      );

      if (!canAssign) {
        await logSecurityEvent({
          event_type: 'failed_authorization',
          details: {
            action: 'role_assignment',
            target_user: targetUserId,
            attempted_roles: roles,
            current_user: session.user.id,
            current_role: currentRole
          },
          user_id: session.user.id
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Role assignment check failed:', error);
      return false;
    }
  };

  const monitorAuthStateChanges = () => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Log successful authentication
          console.log('Auth event:', event, session?.user?.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  };

  useEffect(() => {
    const unsubscribe = monitorAuthStateChanges();
    return unsubscribe;
  }, []);

  return {
    logSecurityEvent,
    checkRoleAssignmentAttempt
  };
};

export default useSecurityMonitoring;