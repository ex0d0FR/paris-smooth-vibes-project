
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Speakers from '@/components/Speakers';
import Schedule from '@/components/Schedule';
import Venue from '@/components/Venue';
import Register from '@/components/Register';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Add scroll reveal effect
    const revealElements = () => {
      const reveals = document.querySelectorAll('.reveal:not(#schedule .reveal)');
      
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', revealElements);
    revealElements(); // Run once to check initial elements in view
    
    // Delay check to ensure schedule elements are properly revealed
    setTimeout(() => {
      const scheduleSection = document.getElementById('schedule');
      if (scheduleSection) {
        const isInView = scheduleSection.getBoundingClientRect().top < window.innerHeight;
        if (isInView) {
          // Force a visibility check on schedule items
          const event = new CustomEvent('scroll');
          window.dispatchEvent(event);
        }
      }
    }, 800);
    
    return () => window.removeEventListener('scroll', revealElements);
  }, []);
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Speakers />
      <Schedule />
      <Venue />
      <Register />
      <Footer />
    </div>
  );
};

export default Index;
