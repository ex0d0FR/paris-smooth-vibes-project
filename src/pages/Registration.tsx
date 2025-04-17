
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Registration = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // First check if WeezTarget is already defined
    if (window.WeezTarget) {
      window.WeezTarget.load();
      return;
    }

    // Load Weezevent script
    const script = document.createElement('script');
    script.src = 'https://widget.weezevent.com/weez.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Create a function to initialize the widget
    const initializeWidget = () => {
      if (window.WeezTarget && containerRef.current) {
        // Make sure we're trying to load after the container is in the DOM
        setTimeout(() => {
          window.WeezTarget.load();
          console.log('WeezTarget.load() called');
        }, 500);
      }
    };
    
    // Initialize widget after script is loaded
    script.onload = initializeWidget;
    
    // Set up a fallback in case the onload event doesn't fire
    const fallbackTimer = setTimeout(initializeWidget, 2000);
    
    return () => {
      // Clean up
      clearTimeout(fallbackTimer);
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('registration.title', 'Registration')} | PARIS2025</title>
        <meta name="description" content={t('registration.description', 'Register for the PARIS 2025 conference')} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link to="/#register" className="inline-flex items-center text-paris-blue hover:text-paris-gold mb-6">
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('registration.backToPricing', 'Back to pricing options')}
            </Link>
            
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 border-b border-yellow-200">
                <h1 className="text-3xl font-bold text-paris-navy mb-2">
                  {t('registration.title', 'Complete Your Registration')}
                </h1>
                <p className="text-gray-700">
                  {t('registration.subtitle', 'Please fill out the form below to secure your spot at PARIS 2025')}
                </p>
              </div>
              
              <div className="p-6">
                {/* Direct inline script approach for Weezevent */}
                <div 
                  id="weezevent-widget-container" 
                  ref={containerRef}
                  className="weezevent-widget-integration"
                  data-src="https://widget.weezevent.com/ticket/E1301418/?code=4111&locale=fr-FR&width_auto=1&color_primary=0032FA"
                  data-id="1301418"
                  data-resize="1"
                  data-width_auto="1"
                  data-noscroll="0"
                  data-use-container="yes"
                  data-type="neo"
                >
                  <div className="text-center py-16">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <p className="mt-8 text-gray-500">Loading registration form...</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-2">
                    {t('registration.securePayment', 'Secure payment processing provided by Weezevent')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('registration.questions', 'Having trouble? Contact us at')} <a href="mailto:info@puentesparis2025.net" className="text-paris-blue hover:underline">info@puentesparis2025.net</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

// Add this to make TypeScript happy
declare global {
  interface Window {
    WeezTarget?: {
      load: () => void;
    };
  }
}

export default Registration;
