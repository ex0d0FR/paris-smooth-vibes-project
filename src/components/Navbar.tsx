
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import useNavigation from '@/hooks/useNavigation';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { t } = useTranslation('nav');
  const { activeSection, isScrolled, scrollToSection } = useNavigation();

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserRole(session.user.id);
        } else {
          setUserRole(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data: primaryRole } = await supabase
        .rpc('get_user_primary_role', { _user_id: userId });
      setUserRole(primaryRole);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: t('home'), href: '/#home' },
    { id: 'about', label: t('about'), href: '/#about' },
    { id: 'speakers', label: t('speakers'), href: '/#speakers' },
    { id: 'schedule', label: t('schedule'), href: '/#schedule' },
    { id: 'register', label: t('register'), href: '/#register' }
  ];

  const venueItems = [
    { label: 'Venue', action: () => scrollToSection('venue') },
    { label: 'Visa Requirements', href: '/visa-requirements' },
    { label: 'Travel Information', href: '/travel-information' },
    { label: 'Accommodations', href: '/accommodations' },
    { label: 'Restaurants', href: '/restaurants' }
  ];

  const showAdminLink = userRole === 'dev' || userRole === 'admin';

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
      isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-paris-blue dark:text-paris-gold">PARIS<span className="text-paris-gold dark:text-white">2025</span></h1>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={item.href}
              className={cn(
                "font-medium capitalize transition-all hover:text-paris-blue dark:hover:text-paris-gold",
                activeSection === item.id 
                  ? "text-paris-blue dark:text-paris-gold" 
                  : isScrolled 
                    ? "text-paris-navy dark:text-white" 
                    : "text-white"
              )}
            >
              {item.label}
            </a>
          ))}
          
          {/* Venue Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "font-medium capitalize transition-all hover:text-paris-blue dark:hover:text-paris-gold p-0 h-auto text-base",
                  isScrolled 
                    ? "text-paris-navy dark:text-white hover:bg-transparent" 
                    : "text-white hover:bg-transparent"
                )}
              >
                Venue <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
              {venueItems.map((item, index) => (
                <DropdownMenuItem key={item.href || index}>
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link 
                      to={item.href}
                      className="w-full px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              {user && (
                <Link to="/tasks">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white dark:border-paris-gold dark:text-paris-gold dark:hover:bg-paris-gold dark:hover:text-paris-navy"
                  >
                    Tasks
                  </Button>
                </Link>
              )}
              {showAdminLink && (
                <Link to="/admin">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white dark:border-paris-gold dark:text-paris-gold dark:hover:bg-paris-gold dark:hover:text-paris-navy"
                  >
                    Admin
                  </Button>
                </Link>
              )}
              <Button 
                variant="outline"
                className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white dark:border-paris-gold dark:text-paris-gold dark:hover:bg-paris-gold dark:hover:text-paris-navy"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button 
                variant="outline"
                className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white dark:border-paris-gold dark:text-paris-gold dark:hover:bg-paris-gold dark:hover:text-paris-navy"
              >
                Sign In
              </Button>
            </Link>
          )}
          <Button 
            className="bg-paris-blue hover:bg-paris-navy text-white dark:bg-paris-gold dark:hover:bg-yellow-500 dark:text-paris-navy"
            onClick={() => scrollToSection('register')}
          >
            {t('register')}
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-paris-navy dark:text-white z-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={cn(
          "fixed top-0 right-0 h-screen w-full bg-white dark:bg-gray-900 p-6 z-40 transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col space-y-6 mt-16">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-xl font-medium capitalize py-2 border-b border-gray-200 dark:border-gray-700 dark:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Venue Section */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Venue</h3>
              {venueItems.map((item, index) => (
                item.action ? (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className="block text-base py-1 pl-4 text-gray-600 dark:text-gray-300 hover:text-paris-blue dark:hover:text-paris-gold w-full text-left"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block text-base py-1 pl-4 text-gray-600 dark:text-gray-300 hover:text-paris-blue dark:hover:text-paris-gold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
            
            {user && (
              <Link to="/tasks" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="outline"
                  className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white dark:border-paris-gold dark:text-paris-gold dark:hover:bg-paris-gold dark:hover:text-paris-navy w-full mb-4"
                >
                  Task Boards
                </Button>
              </Link>
            )}
            
            {user && showAdminLink && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="outline"
                  className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white dark:border-paris-gold dark:text-paris-gold dark:hover:bg-paris-gold dark:hover:text-paris-navy w-full mb-4"
                >
                  Admin Dashboard
                </Button>
              </Link>
            )}
            
            {user ? (
              <Button 
                variant="outline"
                className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white dark:border-paris-gold dark:text-paris-gold dark:hover:bg-paris-gold dark:hover:text-paris-navy w-full mb-4"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="outline"
                  className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white dark:border-paris-gold dark:text-paris-gold dark:hover:bg-paris-gold dark:hover:text-paris-navy w-full mb-4"
                >
                  Sign In
                </Button>
              </Link>
            )}
            
            <Button 
              className="bg-paris-blue hover:bg-paris-navy text-white dark:bg-paris-gold dark:hover:bg-yellow-500 dark:text-paris-navy w-full"
              onClick={() => {
                scrollToSection('register');
                setIsMenuOpen(false);
              }}
            >
              {t('register')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
