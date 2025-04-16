
import { useState, useEffect } from 'react';

interface UseNavigationProps {
  initialSection?: string;
  offset?: number;
}

export const useNavigation = ({ 
  initialSection = 'home', 
  offset = 100 
}: UseNavigationProps = {}) => {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll and highlight active nav item based on section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Get all sections and determine which one is currently in view
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + offset;
      
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
  }, [offset]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return { activeSection, isScrolled, scrollToSection };
};

export default useNavigation;
