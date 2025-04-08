
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SpeakerCard from './SpeakerCard';
import { speakersData } from '@/data/speakersData';

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {speakersData.map((speaker, index) => (
            <SpeakerCard 
              key={speaker.id} 
              speaker={speaker} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
