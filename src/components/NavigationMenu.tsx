import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Settings, User, LogOut, CheckSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NavigationMenuProps {
  variant?: 'default' | 'compact';
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: primaryRole } = await supabase
          .rpc('get_user_primary_role', { _user_id: session.user.id });
        setUserRole(primaryRole);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const canAccessAdmin = userRole && ['dev', 'admin'].includes(userRole);

  const menuItems = [
    {
      label: 'Home',
      path: '/',
      icon: Home,
      show: true
    },
    {
      label: 'Tasks',
      path: '/tasks',
      icon: CheckSquare,
      show: true
    },
    {
      label: 'Admin',
      path: '/admin',
      icon: Settings,
      show: canAccessAdmin
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: User,
      show: true
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-2 p-4 bg-card border-b border-border">
        {menuItems.filter(item => item.show).map((item) => (
          <Button
            key={item.path}
            variant={isActive(item.path) ? "default" : "outline"}
            size="sm"
            onClick={() => navigate(item.path)}
            className="gap-2"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 p-6 bg-card border-b border-border">
      {menuItems.filter(item => item.show).map((item) => (
        <Button
          key={item.path}
          variant={isActive(item.path) ? "default" : "outline"}
          onClick={() => navigate(item.path)}
          className="gap-2"
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={handleSignOut}
        className="gap-2"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
};

export default NavigationMenu;