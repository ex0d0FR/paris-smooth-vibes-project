
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
}

const speakersData: Speaker[] = [
  {
    id: 1,
    name: 'David Bogosian',
    role: 'President/CEO',
    company: 'Christian Aid Mission',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 2,
    name: 'Gabriel Barau',
    role: 'Executive Director',
    company: 'Go International',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 3,
    name: 'Enoch Nyador',
    role: 'Executive Member',
    company: 'Africa Missions Association',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 4,
    name: 'Eliseo Soto',
    role: 'Pastor',
    company: 'Kerygma Church',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 5,
    name: 'Joshua Lingel',
    role: 'President',
    company: 'I2 Ministries',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 6,
    name: 'Yong Cho',
    role: 'General Secretary',
    company: 'Korean World Mission Council for Christ',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 7,
    name: 'Lalano Badoy',
    role: 'National Director',
    company: 'Philippine Missions Association',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 8,
    name: 'Obed Alvarez',
    role: 'President',
    company: 'New World Missions Association',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 9,
    name: 'Gbile Akanni',
    role: 'Director',
    company: 'The Ministry in Living Seed',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 10,
    name: 'Wagih Abdelmassih',
    role: 'Pastor',
    company: 'London Arabic Evangelical Church',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 11,
    name: 'Hisham Kamel',
    role: 'President',
    company: 'Arabic Communication Center',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 12,
    name: 'Noel Anderson',
    role: 'Pastor',
    company: 'First Presbyterian Church',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 13,
    name: 'Sunday Adelaja',
    role: 'Founder',
    company: 'Embassy of God Church',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
  {
    id: 14,
    name: 'Eric Nyamekye',
    role: 'Chairman',
    company: 'The Church of Pentecost',
    image: '/lovable-uploads/919c036e-6a71-4c21-8820-bb7993fcbc92.png',
  },
];

const Speakers = () => {
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
  
  return (
    <section id="speakers" className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 reveal dark:text-white">{t('speakers.title')}</h2>
        <p className="text-lg text-center mb-16 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 reveal" style={{ transitionDelay: '100ms' }}>
          {t('speakers.description')}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {speakersData.map((speaker, index) => (
            <div 
              key={speaker.id} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover-scale reveal"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="p-6 flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-paris-blue dark:border-paris-gold">
                  <AvatarImage src={speaker.image} alt={speaker.name} />
                  <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-1 text-center dark:text-white">{speaker.name}</h3>
                <p className="text-paris-blue dark:text-paris-gold font-medium text-center">{speaker.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-center">{speaker.company}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center reveal" style={{ transitionDelay: '600ms' }}>
          <Button variant="outline" className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white dark:border-paris-gold dark:text-paris-gold dark:hover:bg-paris-gold dark:hover:text-paris-navy">
            {t('speakers.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
