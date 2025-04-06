
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';

interface ScheduleItem {
  time: string;
  title: string;
  speaker: string;
  location: string;
  category: string;
}

const scheduleData: Record<string, ScheduleItem[]> = {
  'day1': [
    { 
      time: '07:00 - 12:00', 
      title: 'Arrivals', 
      speaker: 'Conference Staff', 
      location: 'Main Entrance',
      category: 'Registration'
    },
    { 
      time: '13:00 - 16:00', 
      title: 'Registration', 
      speaker: 'Conference Staff', 
      location: 'Reception Hall',
      category: 'Registration'
    },
    { 
      time: '18:00', 
      title: 'Opening Events Ceremonies', 
      speaker: 'Organizing Committee', 
      location: 'Main Hall',
      category: 'Ceremony'
    },
    { 
      time: '18:30', 
      title: 'Worship', 
      speaker: 'Worship Team', 
      location: 'Main Hall',
      category: 'Worship'
    },
    { 
      time: '19:00', 
      title: 'Why this Gathering', 
      speaker: 'Conference Committee', 
      location: 'Main Hall',
      category: 'Talk'
    },
    { 
      time: '19:30', 
      title: 'Opening Remark from Coordinator', 
      speaker: 'Conference Coordinator', 
      location: 'Main Hall',
      category: 'Keynote'
    },
    { 
      time: '20:00', 
      title: 'The Important of Reaching Europe Sunday', 
      speaker: 'Dr. Hisham Kamel', 
      location: 'Main Hall',
      category: 'Keynote'
    },
    { 
      time: '20:45', 
      title: 'Chairman Address', 
      speaker: 'Dr. Obed Alvarez - Chairman GCM', 
      location: 'Main Hall',
      category: 'Keynote'
    },
    { 
      time: '21:30', 
      title: 'Announcement and closing', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Ceremony'
    }
  ],
  'day2': [
    { 
      time: '8:30 - 9:30', 
      title: 'Spiritual Awakening (Devotion)', 
      speaker: 'Worship Team', 
      location: 'Main Hall',
      category: 'Devotion'
    },
    { 
      time: '9:30 - 10:45', 
      title: 'Building the missionary bridges', 
      speaker: 'Dr. Obed Alvarez', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '10:45 - 10:55', 
      title: 'Reflection and prayers', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '10:55 - 12:00', 
      title: 'Breaking the barrier of secularism in Europe', 
      speaker: 'Dr. Stefan', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '12:00 - 12:10', 
      title: 'Reflection and prayers', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '12:10 - 12:50', 
      title: 'The states of the unreached people and the rise of Islam in Europe', 
      speaker: 'Waggih Abdulmasih', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '12:50 - 2:30', 
      title: 'Lunch and Collaboration', 
      speaker: 'All Attendees', 
      location: 'Dining Hall',
      category: 'Meal'
    },
    { 
      time: '2:30 - 4:00', 
      title: 'Workshop', 
      speaker: 'Conference Staff', 
      location: 'Workshop Rooms',
      category: 'Workshop'
    },
    { 
      time: '4:10 - 5:10', 
      title: 'Biblical foundation for reaching Europe', 
      speaker: 'Apostle Eric Nyamekye', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '5:10 - 5:20', 
      title: 'Reflection', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '5:20 - 6:30', 
      title: 'Reflection', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '6:30 - 7:30', 
      title: 'Dinner', 
      speaker: 'All Attendees', 
      location: 'Dining Hall',
      category: 'Meal'
    }
  ],
  'day3': [
    { 
      time: '8:30 - 9:30', 
      title: 'Spiritual Awakening (Devotion)', 
      speaker: 'Worship Team', 
      location: 'Main Hall',
      category: 'Devotion'
    },
    { 
      time: '9:30 - 10:45', 
      title: 'Europe and the new missiological Reformation', 
      speaker: 'David Bogosian', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '10:45 - 10:55', 
      title: 'Reflection and prayers', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '10:55 - 12:00', 
      title: 'Awakening the diaspora church to reach the host continent', 
      speaker: 'Dr. Sunday Adelaja', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '12:00 - 12:10', 
      title: 'Reflection and prayers', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '12:10 - 2:30', 
      title: 'Lunch and Collaboration', 
      speaker: 'All Attendees', 
      location: 'Dining Hall',
      category: 'Meal'
    },
    { 
      time: '2:30 - 4:00', 
      title: 'Workshop', 
      speaker: 'Conference Staff', 
      location: 'Workshop Rooms',
      category: 'Workshop'
    },
    { 
      time: '4:00 - 5:10', 
      title: 'Discipleship as key to reaching Europe', 
      speaker: 'Bro. Gbile Akanni', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '5:10 - 5:20', 
      title: 'Reflection and prayers', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '5:20 - 6:20', 
      title: 'The global strategy for reaching Europe', 
      speaker: 'Gabriel Barau', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '6:20 - 7:30', 
      title: 'Dinner', 
      speaker: 'All Attendees', 
      location: 'Dining Hall',
      category: 'Meal'
    },
    { 
      time: '7:30 - 8:00', 
      title: 'The Uproar for Europe', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Ceremony'
    }
  ],
  'day4': [
    { 
      time: '8:30 - 9:30', 
      title: 'Spiritual Awakening (Devotion)', 
      speaker: 'Worship Team', 
      location: 'Main Hall',
      category: 'Devotion'
    },
    { 
      time: '9:30 - 10:45', 
      title: 'A return from denominationalism to the mission thrust', 
      speaker: 'Dr. Noel Anderson', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '10:45 - 10:55', 
      title: 'Reflection and prayers', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '10:55 - 12:00', 
      title: 'The challenge of Islam in Europe', 
      speaker: 'Dr. Joshua Lingel', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '12:00 - 12:10', 
      title: 'Reflection and prayers', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '12:10 - 2:30', 
      title: 'Lunch and Collaboration', 
      speaker: 'All Attendees', 
      location: 'Dining Hall',
      category: 'Meal'
    },
    { 
      time: '2:30 - 4:00', 
      title: 'Regional Alignments/Discussion', 
      speaker: 'Conference Staff', 
      location: 'Workshop Rooms',
      category: 'Discussion'
    },
    { 
      time: '4:00 - 5:10', 
      title: 'Prayers as a tool in reaching Europe', 
      speaker: 'Dr. Hisham Kamel', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '5:10 - 5:30', 
      title: 'Reflection and prayers', 
      speaker: 'Conference Staff', 
      location: 'Main Hall',
      category: 'Reflection'
    },
    { 
      time: '5:30 - 6:30', 
      title: 'Arise to Bring back Europe', 
      speaker: 'Gabriel Barau', 
      location: 'Main Hall',
      category: 'Plenary'
    },
    { 
      time: '6:30 - 7:30', 
      title: 'Dinner', 
      speaker: 'All Attendees', 
      location: 'Dining Hall',
      category: 'Meal'
    },
    { 
      time: '7:30 - 8:30', 
      title: 'Closing Ceremony', 
      speaker: 'Conference Committee', 
      location: 'Main Hall',
      category: 'Ceremony'
    }
  ],
};

const Schedule = () => {
  const [activeDay, setActiveDay] = useState('day1');
  const [loading, setLoading] = useState(true);
  const [preloadedData, setPreloadedData] = useState<Record<string, ScheduleItem[]>>({});
  const { t } = useTranslation();
  
  // Preload first activities of each day
  useEffect(() => {
    const preload = async () => {
      // Simulate network delay (remove in production)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create preloaded data with first 3 activities of each day
      const preloaded: Record<string, ScheduleItem[]> = {};
      Object.keys(scheduleData).forEach(day => {
        preloaded[day] = scheduleData[day].slice(0, 3);
      });
      
      setPreloadedData(preloaded);
      setLoading(false);
    };
    
    preload();
  }, []);
  
  // Load remaining data when day tab is clicked
  useEffect(() => {
    if (!loading && !preloadedData[activeDay]) {
      // If this day isn't loaded yet, load it now
      setPreloadedData(prev => ({
        ...prev,
        [activeDay]: scheduleData[activeDay]
      }));
    }
  }, [activeDay, loading, preloadedData]);
  
  // Reveal all schedule items that are in the viewport
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
  
  // Setup intersection observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    // When preloadedData changes or component mounts, reobserve elements
    const revealElements = document.querySelectorAll('#schedule .reveal');
    revealElements.forEach(el => {
      observer.observe(el);
    });

    // Trigger a manual check for elements in viewport
    setTimeout(checkScheduleVisibility, 100);

    return () => {
      revealElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, [preloadedData, activeDay, checkScheduleVisibility]);
  
  // Handle tab change with explicit scroll check
  const handleTabChange = useCallback((value: string) => {
    setActiveDay(value);
    
    if (!preloadedData[value] || preloadedData[value].length < scheduleData[value].length) {
      // Load all data for this day if not already loaded
      setPreloadedData(prev => ({
        ...prev, 
        [value]: scheduleData[value]
      }));
    }
    
    // Force re-check reveal elements on tab change
    setTimeout(checkScheduleVisibility, 50);
  }, [preloadedData, checkScheduleVisibility]);
  
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'keynote': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'workshop': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'panel': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'talk': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'networking': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'social': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'discussion': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
      case 'ceremony': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'worship': return 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200';
      case 'registration': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'devotion': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
      case 'plenary': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'reflection': return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200';
      case 'meal': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Function to render schedule items or skeleton loading state
  const renderScheduleItems = (day: string) => {
    if (loading) {
      // Show skeleton loading for first 3 items
      return Array(3).fill(0).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 reveal">
          <div className="sm:w-1/4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="sm:w-3/4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ));
    }
    
    const itemsToRender = preloadedData[day] || [];
    
    return itemsToRender.map((item, index) => (
      <div 
        key={index}
        className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 reveal"
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="sm:w-1/4">
          <div className="flex items-center">
            <Clock className="mr-2 text-paris-blue dark:text-paris-gold h-4 w-4" />
            <span className="text-sm font-medium dark:text-gray-200">{item.time}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.location}</p>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${getCategoryColor(item.category)}`}>
            {t(`schedule.categories.${item.category.toLowerCase()}`, item.category)}
          </span>
        </div>
        
        <div className="sm:w-3/4">
          <h3 className="text-lg font-semibold dark:text-white">{item.title}</h3>
          <p className="text-paris-blue dark:text-paris-gold">{item.speaker}</p>
        </div>
      </div>
    ));
  };
  
  return (
    <section id="schedule" className="py-20 bg-paris-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 reveal dark:text-white">{t('schedule.title')}</h2>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 reveal" style={{ transitionDelay: '100ms' }}>
          {t('schedule.description')}
        </p>
        
        <div className="max-w-4xl mx-auto reveal" style={{ transitionDelay: '200ms' }}>
          <Tabs defaultValue="day1" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="day1" className="text-sm sm:text-base">{t('schedule.day1')}</TabsTrigger>
              <TabsTrigger value="day2" className="text-sm sm:text-base">{t('schedule.day2')}</TabsTrigger>
              <TabsTrigger value="day3" className="text-sm sm:text-base">{t('schedule.day3')}</TabsTrigger>
              <TabsTrigger value="day4" className="text-sm sm:text-base">{t('schedule.day4')}</TabsTrigger>
            </TabsList>
            
            {Object.keys(scheduleData).map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                {renderScheduleItems(day)}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="text-center mt-10 reveal" style={{ transitionDelay: '600ms' }}>
            <Button className="bg-paris-blue hover:bg-paris-navy text-white dark:bg-paris-gold dark:hover:bg-yellow-500 dark:text-paris-navy">
              {t('schedule.download')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
