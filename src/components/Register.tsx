
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react';
import useRevealAnimation from '@/hooks/useRevealAnimation';

const Register = () => {
  const { t } = useTranslation('register');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Use the hook properly inside the component body
  useRevealAnimation();
  
  const handleRegisterClick = (tier: string) => {
    // Only show the toast if not already visible
    if (!isToastVisible) {
      setSelectedTier(tier);
      setIsToastVisible(true);
      toast({
        title: t('register.toast.title', 'Registration Started'),
        description: t('register.toast.description', { tier: selectedTier }),
      });
      // Reset selectedTier after showing the toast
      setSelectedTier(null);
      
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
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between reveal">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-paris-navy">{t('register.tiers.inPerson.name', 'In-Person')}</h3>
              <p className="text-gray-600 mb-4">{t('register.tiers.inPerson.description', 'Complete on-site experience')}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.inPerson.features.full', 'Full conference access (all 3 days)')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.inPerson.features.workshops', 'All workshops included')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.inPerson.features.networking', 'Networking sessions')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.inPerson.features.coffee', 'Coffee breaks')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.inPerson.features.materials', 'Conference materials')}</span>
                </div>
              </div>
            </div>
            <div>
              <Button 
                variant="claire" 
                size="claire" 
                onClick={() => handleRegisterClick('inPerson')}
              >
                {t('register.registerNow', 'Register Now')} - {t('register.tiers.inPerson.price', '€100')}
              </Button>
            </div>
          </div>
          
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between reveal" style={{
            transitionDelay: '200ms'
          }}>
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-paris-navy">{t('register.tiers.virtual.name', 'Virtual')}</h3>
              <p className="text-gray-600 mb-4">{t('register.tiers.virtual.description', 'Join from anywhere in the world')}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.virtual.features.livestream', 'Live stream of all keynotes')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.virtual.features.digital', 'Digital access to workshops')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.virtual.features.online', 'Online networking opportunities')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.virtual.features.recorded', 'Recorded sessions access')}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-paris-gold mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>{t('register.tiers.virtual.features.access', '30-day access to content after event')}</span>
                </div>
              </div>
            </div>
            <div>
              <Button 
                variant="claire" 
                size="claire" 
                onClick={() => handleRegisterClick('virtual')}
              >
                {t('register.registerNow', 'Register Now')} - {t('register.tiers.virtual.price', '€40')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 reveal" style={{
            transitionDelay: '400ms'
          }}>
          <p className="text-white/80 mb-4">{t('register.questions', 'Have questions about registration or need assistance?')}</p>
          <Button 
            variant="claire_outline" 
            size="claire"
            onClick={() => window.location.href = 'mailto:info@puentesparis2025.net'}
          >
            <Mail className="w-4 h-4 mr-2" />
            {t('register.contact', 'Contact Us')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Register;
