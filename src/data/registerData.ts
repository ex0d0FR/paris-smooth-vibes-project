
import { TFunction } from 'i18next';

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPrimary?: boolean;
}

export const getPricingTiers = (t: TFunction): PricingTier[] => [
  {
    name: t('register.tiers.inPerson.name', 'In-Person'),
    price: t('register.tiers.inPerson.price', '€100'),
    description: t('register.tiers.inPerson.description', 'Complete on-site experience'),
    features: [
      t('register.tiers.inPerson.features.full', 'Full conference access (all 3 days)'),
      t('register.tiers.inPerson.features.workshops', 'All workshops included'),
      t('register.tiers.inPerson.features.networking', 'Networking sessions'),
      t('register.tiers.inPerson.features.coffee', 'Coffee breaks'),
      t('register.tiers.inPerson.features.materials', 'Conference materials')
    ],
    buttonText: t('register.registerNow', 'Register Now'),
    isPrimary: true
  },
  {
    name: t('register.tiers.virtual.name', 'Virtual'),
    price: t('register.tiers.virtual.price', '€40'),
    description: t('register.tiers.virtual.description', 'Join from anywhere in the world'),
    features: [
      t('register.tiers.virtual.features.livestream', 'Live stream of all keynotes'),
      t('register.tiers.virtual.features.digital', 'Digital access to workshops'),
      t('register.tiers.virtual.features.online', 'Online networking opportunities'),
      t('register.tiers.virtual.features.recorded', 'Recorded sessions access'),
      t('register.tiers.virtual.features.materials', 'Digital conference materials'),
      t('register.tiers.virtual.features.access', '30-day access to content after event')
    ],
    buttonText: t('register.registerNow', 'Register Now')
  }
];
