
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import useNavigation from '@/hooks/useNavigation';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { activeSection, isScrolled, scrollToSection } = useNavigation();

  const navItems = [
    { id: 'home', label: t('nav.home'), href: '/#home' },
    { id: 'about', label: t('nav.about'), href: '/#about' },
    { id: 'speakers', label: t('nav.speakers'), href: '/#speakers' },
    { id: 'schedule', label: t('nav.schedule'), href: '/#schedule' },
    { id: 'venue', label: t('nav.venue'), href: '/#venue' },
    { id: 'register', label: t('nav.register'), href: '/#register' }
  ];

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
          <ThemeToggle />
          <Button 
            className="bg-paris-blue hover:bg-paris-navy text-white dark:bg-paris-gold dark:hover:bg-yellow-500 dark:text-paris-navy"
            onClick={() => scrollToSection('register')}
          >
            {t('nav.register')}
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
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="bg-paris-blue hover:bg-paris-navy text-white dark:bg-paris-gold dark:hover:bg-yellow-500 dark:text-paris-navy w-full"
              onClick={() => scrollToSection('register')}
            >
              {t('nav.register')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
