
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Speakers from '@/components/Speakers';
import Schedule from '@/components/Schedule';
import Venue from '@/components/Venue';
import Register from '@/components/Register';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

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
  
  // JSON-LD structured data for the event
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "PARIS 2025 - Building Missionary Bridges",
    "description": "Join us for the PARIS 2025 Building Missionary Bridges conference in October. Connect with thought leaders and innovators from around the world.",
    "startDate": "2025-10-15",
    "endDate": "2025-10-17",
    "location": {
      "@type": "Place",
      "name": "Palais des Congrès de Paris",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2 Place de la Porte Maillot",
        "addressLocality": "Paris",
        "postalCode": "75017",
        "addressCountry": "FR"
      }
    },
    "image": "https://images.unsplash.com/photo-1499856871958-5b9357976b82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "offers": [
      {
        "@type": "Offer",
        "name": "In-Person Registration",
        "price": "100",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Virtual Registration",
        "price": "40",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    ],
    "organizer": {
      "@type": "Organization",
      "name": "PARIS 2025 Conference Team",
      "url": "https://paris2025.lovable.app"
    }
  };

  return (
    <>
      <Helmet>
        <title>PARIS 2025 - Building Missionary Bridges Conference</title>
        <meta name="description" content="Join us for the PARIS 2025 Building Missionary Bridges conference in October. Connect with thought leaders and innovators from around the world." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Speakers />
          <Schedule />
          <Venue />
          <Register />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
