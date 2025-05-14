
import { useEffect } from 'react';

export const useVisibilityEffect = (
  checkScheduleVisibility: () => void, 
  loading: boolean, 
  activeDay: string
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('#schedule .reveal');
    revealElements.forEach(el => {
      observer.observe(el);
    });

    setTimeout(checkScheduleVisibility, 100);

    return () => {
      revealElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, [loading, activeDay, checkScheduleVisibility]);

  // Add a new effect to ensure all Day 1 items are revealed when scrolling to the schedule section
  useEffect(() => {
    const handleScroll = () => {
      const scheduleSection = document.getElementById('schedule');
      if (scheduleSection) {
        const boundingRect = scheduleSection.getBoundingClientRect();
        // If schedule section is in viewport, ensure all day1 items are loaded
        if (boundingRect.top < window.innerHeight && boundingRect.bottom > 0) {
          if (!loading && activeDay === 'day1') {
            checkScheduleVisibility();
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount to check initial position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, activeDay, checkScheduleVisibility]);
};
