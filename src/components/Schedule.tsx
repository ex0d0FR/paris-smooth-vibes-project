
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
      time: '09:30 - 10:30', 
      title: 'Sustainability & Future Business Models', 
      speaker: 'Amara Khan', 
      location: 'Main Hall',
      category: 'Keynote'
    },
    { 
      time: '11:00 - 12:30', 
      title: 'Interactive Design Sprint', 
      speaker: 'Sophie Laurent & Team', 
      location: 'Workshop Room A',
      category: 'Workshop'
    },
    { 
      time: '14:00 - 15:00', 
      title: 'Technology Implementation Case Studies', 
      speaker: 'Michel Dubois & Industry Leaders', 
      location: 'Conference Room C',
      category: 'Panel'
    },
    { 
      time: '15:30 - 16:30', 
      title: 'Visual Storytelling Masterclass', 
      speaker: 'Carlos Rivera', 
      location: 'Studio Space',
      category: 'Workshop'
    },
    { 
      time: '17:00 - 19:00', 
      title: 'Cocktail Reception & Art Exhibition', 
      speaker: 'Featuring Local Artists', 
      location: 'Gallery Hall',
      category: 'Social'
    }
  ],
  'day3': [
    { 
      time: '09:00 - 10:00', 
      title: 'Future Trends Keynote', 
      speaker: 'Special Guest', 
      location: 'Main Hall',
      category: 'Keynote'
    },
    { 
      time: '10:30 - 12:00', 
      title: 'Innovation Roundtables', 
      speaker: 'All Speakers', 
      location: 'Multiple Rooms',
      category: 'Discussion'
    },
    { 
      time: '13:30 - 15:00', 
      title: 'Practical Applications Workshop', 
      speaker: 'Industry Experts', 
      location: 'Workshop Rooms',
      category: 'Workshop'
    },
    { 
      time: '15:30 - 17:00', 
      title: 'Closing Panel & Discussion', 
      speaker: 'All Keynote Speakers', 
      location: 'Main Hall',
      category: 'Panel'
    },
    { 
      time: '19:00 - 22:00', 
      title: 'Gala Dinner', 
      speaker: 'All Attendees', 
      location: 'Le Grand Palais',
      category: 'Social'
    }
  ],
  'day4': [
    { 
      time: '09:30 - 11:00', 
      title: 'Missionary Bridge Building Workshop', 
      speaker: 'International Panel of Experts', 
      location: 'Main Hall',
      category: 'Workshop'
    },
    { 
      time: '11:30 - 12:30', 
      title: 'Cross-Cultural Communication', 
      speaker: 'Dr. Elena Moretti', 
      location: 'Conference Room A',
      category: 'Talk'
    },
    { 
      time: '13:00 - 14:30', 
      title: 'Global Collaboration Strategies', 
      speaker: 'Industry Leaders Panel', 
      location: 'Conference Room B',
      category: 'Panel'
    },
    { 
      time: '15:00 - 16:30', 
      title: 'Closing Ceremony & Awards', 
      speaker: 'Conference Committee', 
      location: 'Main Hall',
      category: 'Ceremony'
    },
    { 
      time: '17:00 - 19:00', 
      title: 'Farewell Reception', 
      speaker: 'All Attendees', 
      location: 'Rooftop Garden',
      category: 'Social'
    }
  ],
};

const Schedule = () => {
  const [activeDay, setActiveDay] = useState('day1');
  const { t } = useTranslation();
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
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
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <section id="schedule" className="py-20 bg-paris-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 reveal dark:text-white">{t('schedule.title')}</h2>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 reveal" style={{ transitionDelay: '100ms' }}>
          {t('schedule.description')}
        </p>
        
        <div className="max-w-4xl mx-auto reveal" style={{ transitionDelay: '200ms' }}>
          <Tabs defaultValue="day1" className="w-full" onValueChange={setActiveDay}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="day1" className="text-sm sm:text-base">{t('schedule.day1')}</TabsTrigger>
              <TabsTrigger value="day2" className="text-sm sm:text-base">{t('schedule.day2')}</TabsTrigger>
              <TabsTrigger value="day3" className="text-sm sm:text-base">{t('schedule.day3')}</TabsTrigger>
              <TabsTrigger value="day4" className="text-sm sm:text-base">{t('schedule.day4')}</TabsTrigger>
            </TabsList>
            
            {Object.keys(scheduleData).map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                {scheduleData[day].map((item, index) => (
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
                        {item.category}
                      </span>
                    </div>
                    
                    <div className="sm:w-3/4">
                      <h3 className="text-lg font-semibold dark:text-white">{item.title}</h3>
                      <p className="text-paris-blue dark:text-paris-gold">{item.speaker}</p>
                    </div>
                  </div>
                ))}
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
