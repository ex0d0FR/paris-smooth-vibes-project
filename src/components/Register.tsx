
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';

const Register = () => {
  const { t } = useTranslation(['register']);
  
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    useRevealAnimation();
  }, []);

  useEffect(() => {
    if (selectedTier) {
      setIsToastVisible(true);
      toast({
        title: t('register.toast.title', 'Registration Started'),
        description: t('register.toast.description', { tier: selectedTier }),
      });
      // Reset selectedTier after showing the toast
      setSelectedTier(null);
    }
  }, [selectedTier, t]);

  const handleRegisterClick = (tier: string) => {
    setSelectedTier(tier);
    // Open Weezevent in a new tab
    window.open('https://widget.weezevent.com/ticket/E1301418/?code=4111&locale=en-GB&width_auto=1&color_primary=0032FA', '_blank');
  };
  
  return (
    <div id="register" className="bg-gradient-to-b from-paris-navy to-paris-gold-dark text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-bold mb-4">Register</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between reveal">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-paris-navy">{t('register.tiers.inPerson.name', 'In-Person')}</h3>
              <p className="text-gray-600 mb-4">{t('register.tiers.inPerson.description', 'Complete on-site experience')}</p>
              <div className="mb-4">
                <h4 className="font-semibold text-paris-navy">Features:</h4>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>{t('register.tiers.inPerson.features.full', 'Full conference access (all 3 days)')}</li>
                  <li>{t('register.tiers.inPerson.features.workshops', 'All workshops included')}</li>
                  <li>{t('register.tiers.inPerson.features.networking', 'Networking sessions')}</li>
                  <li>{t('register.tiers.inPerson.features.coffee', 'Coffee breaks')}</li>
                  <li>{t('register.tiers.inPerson.features.materials', 'Conference materials')}</li>
                </ul>
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
              <div className="mb-4">
                <h4 className="font-semibold text-paris-navy">Features:</h4>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>{t('register.tiers.virtual.features.livestream', 'Live stream of all keynotes')}</li>
                  <li>{t('register.tiers.virtual.features.digital', 'Digital access to workshops')}</li>
                  <li>{t('register.tiers.virtual.features.online', 'Online networking opportunities')}</li>
                  <li>{t('register.tiers.virtual.features.recorded', 'Recorded sessions access')}</li>
                  <li>{t('register.tiers.virtual.features.materials', 'Digital conference materials')}</li>
                  <li>{t('register.tiers.virtual.features.access', '30-day access to content after event')}</li>
                </ul>
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
          <p className="text-white/80 mb-4">Have questions about registration or need assistance?</p>
          <Button 
            variant="claire_outline" 
            size="claire"
            onClick={() => window.location.href = 'mailto:info@puentesparis2025.net'}
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
