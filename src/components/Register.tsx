
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { getPricingTiers } from '@/data/registerData';
import PricingCard from './PricingCard';
import useRevealAnimation from '@/hooks/useRevealAnimation';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {
    toast
  } = useToast();
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const pricingTiers = getPricingTiers(t);

  // Use our custom hook for reveal animations
  useRevealAnimation();
  const handleRegister = (tier: string) => {
    // Navigate to registration page
    navigate('/registration');
    toast({
      title: t('register.toast.title', 'Registration Started'),
      description: t('register.toast.description', `You've selected the ${tier} package. Please complete your registration.`, {
        tier
      }),
      duration: 5000
    });
  };
  return <section id="register" className="py-20 bg-gradient-to-br from-paris-blue to-paris-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">Register</h2>
          
          {/* Top Yellow Button */}
          <div className="mt-8 reveal" style={{
          transitionDelay: '150ms'
        }}>
            
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => <PricingCard key={tier.name} tier={tier} onRegister={handleRegister} index={index} />)}
        </div>
        
        <div className="text-center mt-12 reveal" style={{
        transitionDelay: '400ms'
      }}>
          <p className="text-white/80 mb-4">{t('register.questions')}</p>
          <Button variant="claire_outline" icon={<HelpCircle />} size="claire">
            {t('register.contact')}
          </Button>
        </div>
      </div>
    </section>;
};
export default Register;
