
import { useEffect } from 'react';

const useRevealAnimation = () => {
  useEffect(() => {
    const revealElements = () => {
      const reveals = document.querySelectorAll('.reveal:not(#schedule .reveal)');
      
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', revealElements);
    // Run once to check initial elements in view
    revealElements();
    
    return () => window.removeEventListener('scroll', revealElements);
  }, []);
};

export default useRevealAnimation;
