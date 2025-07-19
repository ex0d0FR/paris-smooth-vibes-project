
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'dev' | 'admin' | 'team_leader' | 'volunteer' | 'guest';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackRoute?: string;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles, 
  fallbackRoute = '/profile' 
}: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      // Get user's primary role
      const { data: primaryRole } = await supabase
        .rpc('get_user_primary_role', { _user_id: session.user.id });

      if (!primaryRole || !allowedRoles.includes(primaryRole)) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        navigate(fallbackRoute);
        return;
      }

      setHasAccess(true);
    } catch (error) {
      console.error('Error checking access:', error);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
