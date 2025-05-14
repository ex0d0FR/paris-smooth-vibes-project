
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useRevealAnimation from '@/hooks/useRevealAnimation';

const Register = () => {
  const { t } = useTranslation('register');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const navigate = useNavigate();
  
  // Use the hook properly inside the component body
  useRevealAnimation();
  
  const handleRegisterClick = (tier: string) => {
    // Set selected tier first
    setSelectedTier(tier);
    
    // Only show the toast if not already visible
    if (!isToastVisible) {
      setIsToastVisible(true);
      toast({
        title: t('toast.title'),
        description: t('toast.description', { tier }),
      });
      
      // Navigate to registration page
      navigate('/registration');
      
      // Reset after toast has been shown
      setTimeout(() => {
        setIsToastVisible(false);
      }, 5000);
    }
  };
  
  return (
    <section id="register" className="py-16 bg-paris-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('title', 'Register for PARIS 2025')}</h2>
          <div className="w-20 h-1 bg-paris-gold mx-auto mb-6"></div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            {t('description', 'Secure your spot at the most anticipated global conference of the year. Early bird pricing available for a limited time.')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* In-Person Card */}
          <div className="bg-[#1a1f2c] text-white rounded-xl shadow-lg p-6 flex flex-col justify-between reveal border-2 border-paris-gold">
            <div>
              <h3 className="text-2xl font-semibold mb-2">{t('tiers.inPerson.name', 'In-Person')}</h3>
              <p className="text-gray-300 mb-4">{t('tiers.inPerson.description', 'Complete on-site experience')}</p>
              
              <div className="mb-4">
                <div className="text-3xl font-bold mb-2">
                  {t('tiers.inPerson.price', '€100')}
                  <span className="text-sm text-gray-300 ml-1">/ {t('tiers.attendee', 'attendee')}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.inPerson.features.full', 'Full conference access (all 3 days)')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.inPerson.features.workshops', 'All workshops included')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.inPerson.features.networking', 'Networking sessions')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.inPerson.features.coffee', 'Coffee breaks')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.inPerson.features.materials', 'Conference materials')}</span>
                </div>
              </div>
            </div>
            <div>
              <Button 
                className="w-full bg-paris-gold hover:bg-yellow-500 text-[#1a1f2c] font-bold py-3 text-lg"
                onClick={() => handleRegisterClick('inPerson')}
              >
                {t('registerNow', 'Register Now')}
              </Button>
            </div>
          </div>
          
          {/* Virtual Card */}
          <div className="bg-[#0c1121] text-white rounded-xl shadow-lg p-6 flex flex-col justify-between reveal" style={{
            transitionDelay: '200ms'
          }}>
            <div>
              <h3 className="text-2xl font-semibold mb-2">{t('tiers.virtual.name', 'Virtual')}</h3>
              <p className="text-gray-300 mb-4">{t('tiers.virtual.description', 'Join from anywhere in the world')}</p>
              
              <div className="mb-4">
                <div className="text-3xl font-bold mb-2">
                  {t('tiers.virtual.price', '€40')}
                  <span className="text-sm text-gray-300 ml-1">/ {t('tiers.attendee', 'attendee')}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.virtual.features.livestream', 'Live stream of all keynotes')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.virtual.features.digital', 'Digital access to workshops')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.virtual.features.online', 'Online networking opportunities')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.virtual.features.recorded', 'Recorded sessions access')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.virtual.features.materials', 'Digital conference materials')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('tiers.virtual.features.access', '30-day access to content after event')}</span>
                </div>
              </div>
            </div>
            <div>
              <Button 
                className="w-full bg-white hover:bg-gray-100 text-[#0c1121] font-bold py-3 text-lg"
                onClick={() => handleRegisterClick('virtual')}
              >
                {t('registerNow', 'Register Now')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 reveal" style={{
            transitionDelay: '400ms'
          }}>
          <p className="text-white/80 mb-4">{t('questions', 'Have questions about registration or need assistance?')}</p>
          <Button 
            className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-6 py-2"
            onClick={() => window.location.href = 'mailto:info@puentesparis2025.net'}
          >
            <Mail className="w-4 h-4 mr-2" />
            {t('contact', 'Contact Us')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Register;
