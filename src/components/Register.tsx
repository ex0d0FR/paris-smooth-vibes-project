
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { getPricingTiers } from '@/data/registerData';
import PricingCard from './PricingCard';
import useRevealAnimation from '@/hooks/useRevealAnimation';

const Register = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const pricingTiers = getPricingTiers(t);
  
  // Use our custom hook for reveal animations
  useRevealAnimation();

  const handleRegister = (tier: string) => {
    const url = 'https://widget.weezevent.com/ticket/E1301418/?code=4111&locale=fr-FR&width_auto=1&color_primary=0032FA';
    const w = window.open(
      url, 
      'Billetterie_weezevent', 
      'width=650, height=600, top=100, left=100, toolbar=no, resizable=yes, scrollbars=yes, status=no'
    );
    if (w) w.focus();
    
    toast({
      title: t('register.toast.title', 'Registration Started'),
      description: t('register.toast.description', `You've selected the ${tier} package. Please complete your registration in the popup window.`, { tier }),
      duration: 5000,
    });
  };
  
  return (
    <section id="register" className="py-20 bg-gradient-to-br from-paris-blue to-paris-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">{t('register.title')}</h2>
          <p className="text-lg text-white/90 reveal" style={{ transitionDelay: '100ms' }}>
            {t('register.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard 
              key={tier.name}
              tier={tier}
              onRegister={handleRegister}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 reveal" style={{ transitionDelay: '400ms' }}>
          <p className="text-white/80 mb-4">{t('register.questions')}</p>
          <Button 
            variant="claire_outline" 
            icon={<HelpCircle />}
            size="claire"
          >
            {t('register.contact')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Register;
