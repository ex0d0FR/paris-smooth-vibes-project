import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const InvitationLetter = () => {
  const { t } = useTranslation('invitationLetter');
  const navigate = useNavigate();

  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="//embed.typeform.com/next/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('title', 'Invitation Letter Request - PARIS 2025')}</title>
        <meta name="description" content={t('description', 'Request an official invitation letter for visa application to attend PARIS 2025 conference')} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-paris-navy to-gray-800">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-6 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backToHome', 'Back to Home')}
              </Button>
              
              <div className="flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-paris-gold mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {t('title', 'Invitation Letter Request')}
                </h1>
              </div>
              
              <p className="text-white/80 text-lg">
                {t('subtitle', 'Request an official invitation letter for visa application purposes')}
              </p>
            </div>

            {/* Typeform Embed */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Typeform embed */}
              <div 
                data-tf-live="01K4D0TWTJRWMKZX57AWA4FK7Y"
              ></div>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  {t('contact.text', 'Questions? Contact us at')}{' '}
                  <a href="mailto:info@puentesparis2025.net" className="text-paris-gold hover:underline">
                    info@puentesparis2025.net
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default InvitationLetter;