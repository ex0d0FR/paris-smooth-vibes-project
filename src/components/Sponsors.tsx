
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sponsors = () => {
  const { t } = useTranslation('sponsors');

  return (
    <section id="sponsors" className="py-16 bg-gradient-to-br from-paris-blue/5 to-paris-gold/5 dark:from-paris-blue/10 dark:to-paris-gold/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-paris-navy dark:text-white">
            {t('title', 'Sponsors')}
          </h2>
          <div className="w-20 h-1 bg-paris-gold mx-auto mb-6"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center reveal" style={{ transitionDelay: '200ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover-scale">
              <Heart className="w-12 h-12 text-paris-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-paris-navy dark:text-white">
                {t('sponsorTitle', 'Become a Sponsor')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('sponsorDescription', 'Help us make this conference possible by supporting venue costs, speaker travel, and conference materials.')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover-scale">
              <Users className="w-12 h-12 text-paris-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-paris-navy dark:text-white">
                {t('ticketTitle', 'Sponsor Attendees')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('ticketDescription', 'Purchase tickets for others who might not otherwise be able to attend this important gathering.')}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              {t('callToAction', 'Do you want to help sponsor this conference? or do you want to pay for tickets so that others can attend?')}
            </p>
          </div>

          <Link to="/sponsors">
            <Button 
              size="lg" 
              className="bg-paris-gold hover:bg-paris-gold/90 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('becomeASponsor', 'Become a Sponsor')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
