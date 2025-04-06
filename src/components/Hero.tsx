
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
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
            backgroundImage: "url('https://images.unsplash.com/photo-1499856871958-5b9357976b82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 hero-gradient dark:bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <p className="text-paris-pink font-medium mb-2 reveal">October 12-15, 2025 | Paris, France</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow reveal" style={{ transitionDelay: '200ms' }}>
          PARIS 2025<br /> 
          <span className="text-paris-gold">BUILDING MISSIONARY</span> BRIDGES
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8 reveal" style={{ transitionDelay: '400ms' }}>
          Join us for the most anticipated global conference bringing together thought leaders, innovators and changemakers in the heart of Paris.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal" style={{ transitionDelay: '600ms' }}>
          <Button onClick={scrollToRegister} size="lg" className="bg-paris-gold text-paris-navy hover:bg-yellow-500 font-semibold px-8 dark:bg-paris-gold dark:hover:bg-yellow-400">
            Register Now
          </Button>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10 px-8 dark:border-white dark:text-white dark:hover:bg-white/20">
            Learn More
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
