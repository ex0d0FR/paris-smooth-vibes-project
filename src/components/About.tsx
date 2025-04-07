
import React, { useEffect } from 'react';
import { Calendar, MapPin, Users, Globe, Church } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
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
    <section id="about" className="py-20 bg-paris-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 reveal dark:text-white">{t('about.title')}</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg leading-relaxed mb-6 reveal dark:text-gray-200">
              {t('about.para1')}
            </p>
            <p className="text-lg leading-relaxed mb-6 reveal dark:text-gray-200" style={{ transitionDelay: '200ms' }}>
              {t('about.para2')}
            </p>
            <p className="text-lg leading-relaxed mb-6 reveal dark:text-gray-200" style={{ transitionDelay: '400ms' }}>
              {t('about.para3')}
            </p>
            <p className="text-lg leading-relaxed mb-6 reveal dark:text-gray-200" style={{ transitionDelay: '600ms' }}>
              {t('about.para4')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conference Highlights */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover-scale reveal" style={{ transitionDelay: '100ms' }}>
              <div className="bg-paris-blue/10 dark:bg-paris-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calendar className="text-paris-blue dark:text-paris-gold w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('about.highlights.days.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('about.highlights.days.description')}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover-scale reveal" style={{ transitionDelay: '200ms' }}>
              <div className="bg-paris-blue/10 dark:bg-paris-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-paris-blue dark:text-paris-gold w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('about.highlights.speakers.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('about.highlights.speakers.description')}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover-scale reveal" style={{ transitionDelay: '300ms' }}>
              <div className="bg-paris-blue/10 dark:bg-paris-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MapPin className="text-paris-blue dark:text-paris-gold w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('about.highlights.venues.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('about.highlights.venues.description')}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover-scale reveal" style={{ transitionDelay: '400ms' }}>
              <div className="bg-paris-blue/10 dark:bg-paris-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Globe className="text-paris-blue dark:text-paris-gold w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('about.highlights.attendees.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('about.highlights.attendees.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
