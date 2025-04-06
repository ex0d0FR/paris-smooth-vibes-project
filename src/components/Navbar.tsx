
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useTranslation();

  // Handle scroll and highlight active nav item based on section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Get all sections and determine which one is currently in view
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'speakers', label: t('nav.speakers') },
    { id: 'schedule', label: t('nav.schedule') },
    { id: 'venue', label: t('nav.venue') },
    { id: 'register', label: t('nav.register') }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
      isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <h1 className="text-2xl font-bold text-paris-blue dark:text-paris-gold">PARIS<span className="text-paris-gold dark:text-white">2025</span></h1>
        </a>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
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
            </button>
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
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xl font-medium capitalize py-2 border-b border-gray-200 dark:border-gray-700 dark:text-white"
              >
                {item.label}
              </button>
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
