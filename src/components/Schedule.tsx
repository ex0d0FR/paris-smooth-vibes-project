
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Clock } from 'lucide-react';

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
      time: '09:00 - 10:00', 
      title: 'Opening Keynote: The Future of Innovation', 
      speaker: 'Michel Dubois', 
      location: 'Main Hall',
      category: 'Keynote'
    },
    { 
      time: '10:30 - 11:30', 
      title: 'Design Thinking Workshop', 
      speaker: 'Sophie Laurent', 
      location: 'Workshop Room A',
      category: 'Workshop'
    },
    { 
      time: '12:00 - 13:00', 
      title: 'Global Market Trends Panel', 
      speaker: 'Amara Khan & Panel', 
      location: 'Conference Room B',
      category: 'Panel'
    },
    { 
      time: '14:30 - 15:30', 
      title: 'Creative Breakthroughs in Technology', 
      speaker: 'Carlos Rivera', 
      location: 'Innovation Lab',
      category: 'Talk'
    },
    { 
      time: '16:00 - 17:30', 
      title: 'Networking Reception', 
      speaker: 'All Speakers & Attendees', 
      location: 'Terrace Lounge',
      category: 'Networking'
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
};

const Schedule = () => {
  const [activeDay, setActiveDay] = useState('day1');
  
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
      case 'keynote': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'panel': return 'bg-purple-100 text-purple-800';
      case 'talk': return 'bg-yellow-100 text-yellow-800';
      case 'networking': return 'bg-pink-100 text-pink-800';
      case 'social': return 'bg-orange-100 text-orange-800';
      case 'discussion': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <section id="schedule" className="py-20 bg-paris-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 reveal">Conference Schedule</h2>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-600 reveal" style={{ transitionDelay: '100ms' }}>
          Plan your PARIS 2025 experience with our comprehensive program
        </p>
        
        <div className="max-w-4xl mx-auto reveal" style={{ transitionDelay: '200ms' }}>
          <Tabs defaultValue="day1" className="w-full" onValueChange={setActiveDay}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="day1" className="text-sm sm:text-base">Day 1 (Oct 12)</TabsTrigger>
              <TabsTrigger value="day2" className="text-sm sm:text-base">Day 2 (Oct 13)</TabsTrigger>
              <TabsTrigger value="day3" className="text-sm sm:text-base">Day 3 (Oct 14)</TabsTrigger>
            </TabsList>
            
            {Object.keys(scheduleData).map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                {scheduleData[day].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 reveal"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="sm:w-1/4">
                      <div className="flex items-center">
                        <Clock className="mr-2 text-paris-blue h-4 w-4" />
                        <span className="text-sm font-medium">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.location}</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                    
                    <div className="sm:w-3/4">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-paris-blue">{item.speaker}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="text-center mt-10 reveal" style={{ transitionDelay: '600ms' }}>
            <Button className="bg-paris-blue hover:bg-paris-navy text-white">
              Download Full Schedule
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
