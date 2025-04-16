
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
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

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/lovable-uploads/2b54cf1b-8468-429d-b12b-26681ab670ea.png')",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <p className="text-paris-gold font-medium mb-2 reveal">{t('hero.date')}</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow reveal" style={{ transitionDelay: '200ms' }}>
          {t('hero.title')}<br /> 
          <span className="text-paris-gold">{t('hero.subtitle')}</span>
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8 reveal" style={{ transitionDelay: '400ms' }}>
          {t('hero.description')}
        </p>
        <div className="flex justify-center reveal" style={{ transitionDelay: '600ms' }}>
          <Button onClick={scrollToRegister} size="lg" className="bg-paris-gold text-paris-navy hover:bg-yellow-500 font-semibold px-8 dark:bg-paris-gold dark:hover:bg-yellow-400">
            {t('hero.registerNow')}
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white" />
      </div>
    </section>
  );
};

export default Hero;
