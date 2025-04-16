
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.1
    });
    
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
      {/* Enhanced Background with Layers */}
      <div className="absolute inset-0 z-0">
        {/* Paris skyline silhouette background */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: "url('/world-map.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-paris-navy/90 via-paris-navy/70 to-paris-navy/95"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {/* Golden accent light */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-paris-gold/10 blur-3xl"></div>
            {/* Blue accent light */}
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-paris-blue/20 blur-3xl"></div>
          </div>
        </div>
        
        {/* Subtle grid pattern overlay for texture */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <p className="text-paris-pink font-medium mb-2 reveal">{t('hero.date')}</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow reveal" style={{
          transitionDelay: '200ms'
        }}>
          {t('hero.title')}<br /> 
          <span className="text-paris-gold">{t('hero.subtitle')}</span>
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8 reveal" style={{
          transitionDelay: '400ms'
        }}>
          {t('hero.description')}
        </p>
        <div className="flex justify-center reveal" style={{
          transitionDelay: '600ms'
        }}>
          <Button onClick={scrollToRegister} size="claire" variant="claire" className="font-semibold">
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
