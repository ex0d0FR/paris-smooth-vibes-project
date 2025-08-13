import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileAccessLogger {
  logProfileAccess: (accessedUserId: string, accessType: 'full_profile' | 'contact_info' | 'collaborator_info', boardId?: string) => Promise<void>;
}

export const useProfileAccessLogger = (): ProfileAccessLogger => {
  const { toast } = useToast();

  const logProfileAccess = async (
    accessedUserId: string, 
    accessType: 'full_profile' | 'contact_info' | 'collaborator_info',
    boardId?: string
  ) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      // Log the access attempt
      const { error } = await supabase
        .from('profile_access_log')
        .insert({
          accessor_user_id: session.user.id,
          accessed_user_id: accessedUserId,
          access_type: accessType,
          board_id: boardId || null,
          // Note: IP and user agent would need to be captured client-side or via edge function
          created_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Failed to log profile access:', error);
      }

      // For sensitive access, show a subtle notification
      if (accessType === 'contact_info') {
        console.log(`Contact information accessed for user: ${accessedUserId}`);
      }
    } catch (error) {
      console.error('Profile access logging error:', error);
    }
  };

  return { logProfileAccess };
};

// Hook for secure profile data fetching with automatic logging
export const useSecureProfileAccess = () => {
  const { logProfileAccess } = useProfileAccessLogger();

  const getCollaboratorInfo = async (userId: string): Promise<any> => {
    try {
      const { data, error } = await supabase
        .rpc('get_collaborator_info', { _user_id: userId });

      if (error) throw error;

      // Log the access
      await logProfileAccess(userId, 'collaborator_info');

      return data?.[0] || null;
    } catch (error) {
      console.error('Error fetching collaborator info:', error);
      return null;
    }
  };

  const getContactInfo = async (userId: string): Promise<any> => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_contact_info', { _user_id: userId });

      if (error) throw error;

      // Log the sensitive access
      await logProfileAccess(userId, 'contact_info');

      return data?.[0] || null;
    } catch (error) {
      console.error('Error fetching contact info:', error);
      return null;
    }
  };

  const getBoardCollaborators = async (boardId: string): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .rpc('get_board_collaborators', { _board_id: boardId });

      if (error) throw error;

      // Log access for each collaborator
      if (data?.length) {
        for (const collaborator of data) {
          await logProfileAccess(collaborator.user_id, 'collaborator_info', boardId);
        }
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching board collaborators:', error);
      return [];
    }
  };

  return {
    getCollaboratorInfo,
    getContactInfo,
    getBoardCollaborators
  };
};

export default useSecureProfileAccess;