
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { PricingTier } from '@/data/registerData';

interface PricingCardProps {
  tier: PricingTier;
  onRegister: (tierName: string) => void;
  index: number;
}

const PricingCard = ({ tier, onRegister, index }: PricingCardProps) => {
  return (
    <div 
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
            onClick={() => onRegister(tier.name)}
          >
            {tier.buttonText}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingCard;
