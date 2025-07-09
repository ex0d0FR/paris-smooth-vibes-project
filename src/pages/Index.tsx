
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Speakers from '@/components/Speakers';
import Schedule from '@/components/Schedule';
import Venue from '@/components/Venue';
import Register from '@/components/Register';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import Sponsors from '@/components/Sponsors';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Since About component is read-only and doesn't export what we need,
// let's create our own AboutSection component
const AboutSection = () => {
  const { t } = useTranslation('about');
  
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-paris-navy dark:text-white">
            {t('title', 'About Paris 2025')}
          </h2>
          <div className="w-20 h-1 bg-paris-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('para1', "Paris 2025 will bring together church leaders from all over the world to examine relevant and pressing topics in today's global reformation, engaging unreached peoples, evangelizing the Muslim world and discipling nations.")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal" style={{ transitionDelay: '200ms' }}>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover-scale">
            <div className="text-paris-gold text-3xl font-bold mb-3">{t('highlights.speakers.title')}</div>
            <h3 className="text-xl font-semibold mb-2 text-paris-navy dark:text-white">
              {t('speakers.title', 'Global Speakers')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('highlights.speakers.description')}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover-scale">
            <div className="text-paris-gold text-3xl font-bold mb-3">{t('highlights.days.title')}</div>
            <h3 className="text-xl font-semibold mb-2 text-paris-navy dark:text-white">
              {t('schedule.title', 'Conference Schedule')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('highlights.days.description')}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover-scale">
            <div className="text-paris-gold text-3xl font-bold mb-3">{t('highlights.attendees.title')}</div>
            <h3 className="text-xl font-semibold mb-2 text-paris-navy dark:text-white">
              {t('highlights.attendees.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('highlights.attendees.description')}
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center reveal" style={{ transitionDelay: '400ms' }}>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            {t('para4')}
          </p>
        </div>
      </div>
    </section>
  );
};

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
          <AboutSection />
          <Speakers />
          {/* <Schedule /> */}
          <Venue />
          <FAQ />
          <Register />
          <Sponsors />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
