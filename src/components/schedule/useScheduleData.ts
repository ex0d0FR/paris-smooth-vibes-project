
import { useState, useEffect, useCallback } from 'react';
import { scheduleData } from './ScheduleData';
import { ScheduleData, ScheduleItem } from './types';

export const useScheduleData = () => {
  const [activeDay, setActiveDay] = useState('day1');
  const [loading, setLoading] = useState(true);
  const [preloadedData, setPreloadedData] = useState<Record<string, ScheduleItem[]>>({});
  
  useEffect(() => {
    const preload = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Immediately load all data for day1 instead of just the first 3 items
      const preloaded: Record<string, ScheduleItem[]> = {
        'day1': scheduleData['day1']
      };
      
      // For other days, just preload first 3 items
      Object.keys(scheduleData).forEach(day => {
        if (day !== 'day1') {
          preloaded[day] = scheduleData[day].slice(0, 3);
        }
      });
      
      setPreloadedData(preloaded);
      setLoading(false);
    };
    
    preload();
  }, []);
  
  useEffect(() => {
    if (!loading && !preloadedData[activeDay]) {
      setPreloadedData(prev => ({
        ...prev,
        [activeDay]: scheduleData[activeDay]
      }));
    }
  }, [activeDay, loading, preloadedData]);

  const checkScheduleVisibility = useCallback(() => {
    const revealElements = document.querySelectorAll('#schedule .reveal');
    revealElements.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('revealed');
      }
    });
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveDay(value);
    
    if (!preloadedData[value] || preloadedData[value].length < scheduleData[value].length) {
      setPreloadedData(prev => ({
        ...prev, 
        [value]: scheduleData[value]
      }));
    }
    
    // Use a slightly longer timeout to ensure DOM is updated before checking visibility
    setTimeout(checkScheduleVisibility, 150);
  }, [preloadedData, checkScheduleVisibility]);

  return {
    activeDay,
    loading,
    preloadedData,
    scheduleData,
    checkScheduleVisibility,
    handleTabChange
  };
};
