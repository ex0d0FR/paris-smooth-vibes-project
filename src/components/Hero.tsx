import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowDown, Globe } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';
import useRevealAnimation from '@/hooks/useRevealAnimation';
import YouTubeVideoSection from '@/components/YouTubeVideoSection';

const Hero = () => {
  const { t } = useTranslation('hero');
  const { theme } = useTheme();
  
  useRevealAnimation();
  
  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Background layers */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/paris-skyline.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: theme === 'dark' ? 0.7 : 0.9
            }}
          />
          
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-paris-navy/90 via-paris-navy/80 to-paris-navy/95' 
              : 'bg-gradient-to-b from-paris-navy/75 via-paris-navy/65 to-paris-navy/85'
          }`}></div>
          
          <div 
            className={`absolute inset-0 ${theme === 'dark' ? 'opacity-10' : 'opacity-15'}`}
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply"
            }}
          />
          
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/3 w-20 h-20">
              <div className={`absolute w-full h-full rounded-full border-2 ${
                theme === 'dark' 
                  ? 'border-paris-gold/20' 
                  : 'border-paris-gold/30'
              } animate-ping`} style={{ animationDuration: '3s' }}></div>
            </div>
            
            <div className="absolute bottom-1/3 right-1/3 w-16 h-16">
              <div className={`absolute w-full h-full rounded-full border-2 ${
                theme === 'dark' 
                  ? 'border-paris-gold/20' 
                  : 'border-paris-gold/30'
              } animate-ping`} style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
            </div>
            
            <div className="absolute top-1/2 right-1/4 w-24 h-24">
              <div className={`absolute w-full h-full rounded-full border-2 ${
                theme === 'dark' 
                  ? 'border-paris-gold/20' 
                  : 'border-paris-gold/30'
              } animate-ping`} style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            </div>
          </div>
          
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full">
              <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full ${
                theme === 'dark' 
                  ? 'bg-paris-gold/10 blur-3xl' 
                  : 'bg-paris-gold/15 blur-3xl'
              } float-animation`}></div>
              
              <div className={`absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full ${
                theme === 'dark' 
                  ? 'bg-paris-gold/15 blur-3xl' 
                  : 'bg-paris-gold/20 blur-3xl'
              } float-animation-delay`}></div>
            </div>
          </div>
          
          <div 
            className={`absolute inset-0 ${theme === 'dark' ? 'opacity-10' : 'opacity-15'}`}
            style={{
              backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255, 215, 0, .05) 25%, rgba(255, 215, 0, .05) 26%, transparent 27%, transparent 74%, rgba(255, 215, 0, .05) 75%, rgba(255, 215, 0, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 215, 0, .05) 25%, rgba(255, 215, 0, .05) 26%, transparent 27%, transparent 74%, rgba(255, 215, 0, .05) 75%, rgba(255, 215, 0, .05) 76%, transparent 77%, transparent)",
              backgroundSize: "50px 50px"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <p className="text-paris-gold font-medium mb-2 reveal">{t('date')}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow reveal" style={{
            transitionDelay: '200ms'
          }}>
            {t('title')}<br /> 
            <span className="text-paris-gold">{t('subtitle')}</span>
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8 reveal" style={{
            transitionDelay: '400ms'
          }}>
            {t('description')}
          </p>
          <div className="flex justify-center gap-4 reveal" style={{
            transitionDelay: '600ms'
          }}>
            <Button 
              onClick={scrollToRegister} 
              size="lg"
              className="bg-gradient-to-r from-paris-gold via-yellow-400 to-paris-gold hover:from-yellow-400 hover:via-paris-gold hover:to-yellow-400 text-paris-navy font-bold text-lg px-8 py-6 h-auto rounded-2xl shadow-2xl hover:shadow-paris-gold/50 transform hover:scale-105 transition-all duration-300 animate-pulse border-2 border-paris-gold/30" 
              icon={<Globe size={22} />}
            >
              Register, places are limited
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-white" />
        </div>
      </section>
      
      {/* YouTube Videos Section */}
      <YouTubeVideoSection />
    </>
  );
};

export default Hero;