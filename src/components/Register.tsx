
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPrimary?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'In-Person',
    price: '€100',
    description: 'Complete on-site experience',
    features: [
      'Full conference access (all 3 days)',
      'All workshops included',
      'Networking sessions',
      'Lunch and refreshments',
      'Conference materials',
      'Gala dinner invitation'
    ],
    buttonText: 'Register Now',
    isPrimary: true
  },
  {
    name: 'Virtual',
    price: '€40',
    description: 'Join from anywhere in the world',
    features: [
      'Live stream of all keynotes',
      'Digital access to workshops',
      'Online networking opportunities',
      'Recorded sessions access',
      'Digital conference materials',
      '30-day access to content after event'
    ],
    buttonText: 'Register Now'
  }
];

const Register = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handleRegister = (tier: string) => {
    toast({
      title: "Registration Started",
      description: `You've selected the ${tier} package. Our registration system will be ready soon!`,
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
            <div 
              key={tier.name}
              className={`reveal ${tier.isPrimary ? 'md:-mt-4 md:mb-4' : ''}`} 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className={`h-full flex flex-col ${tier.isPrimary ? 'border-paris-gold shadow-lg border-2' : ''}`}>
                <CardHeader className={tier.isPrimary ? 'bg-paris-gold/10' : ''}>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-white/70">{tier.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-sm text-white/70"> / attendee</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-3 mb-6 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex">
                        <Check className="text-paris-gold mr-2 h-5 w-5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.isPrimary ? 'bg-paris-gold hover:bg-yellow-500 text-paris-navy' : 'bg-white hover:bg-white/90 text-paris-navy'}`}
                    onClick={() => handleRegister(tier.name)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 reveal" style={{ transitionDelay: '400ms' }}>
          <p className="text-white/80 mb-4">{t('register.questions')}</p>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            {t('register.contact')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Register;
