import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  return <footer className="bg-paris-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">PARIS<span className="text-paris-gold">2025</span></h2>
            <p className="text-white/80 mb-4">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {[{
              key: 'home',
              label: 'Home'
            }, {
              key: 'about',
              label: 'About'
            }, {
              key: 'speakers',
              label: 'Speakers'
            }, {
              key: 'schedule',
              label: 'Schedule'
            }, {
              key: 'venue',
              label: 'Venue'
            }, {
              key: 'register',
              label: 'Register'
            }].map(item => <li key={item.key}>
                  <a href={`#${item.key}`} className="text-white/80 hover:text-paris-gold transition-colors">
                    {t(`nav.${item.key}`)}
                  </a>
                </li>)}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.conferenceInfo')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">{t('footer.infoItems.travel')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">{t('footer.infoItems.visa')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">{t('footer.infoItems.accommodations')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <a href="mailto:info@paris2025.net" className="text-white/80 hover:text-paris-gold transition-colors">
                  info@paris2025.net
                </a>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">{t('footer.partners')}</h3>
              
            </div>
          </div>
        </div>

        {/* Endorsed By Section */}
        <div className="border-t border-white/10 pt-12 pb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold">{t('footer.endorsedBy')}</h2>
            <p className="text-white/80 mt-3 max-w-3xl mx-auto">
              {t('footer.endorsementDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center md:text-right">
              <a href="https://kerygmaparis.fr/es/" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img src="/lovable-uploads/a4c4edbb-9b13-4fac-be62-f8df611638b6.png" alt="Kerygma Paris" className="w-48 h-auto mx-auto md:mx-0 mb-3" />
              </a>
              <p className="text-white/80 text-sm">
                {t('footer.kerygma')}
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <a href="https://www.globalmissioncouncil.org/" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img src="/lovable-uploads/dd272009-d49c-4a66-972c-5437dc84f909.png" alt="Global Council of Mission" className="w-32 h-auto mx-auto md:mx-0 mb-3" />
              </a>
              <p className="text-white/80 text-sm">
                {t('footer.globalCouncil')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <p>{t('footer.copyright')}</p>
            <p className="italic">{t('footer.developed')} <Heart size={14} className="inline text-paris-gold" /> for "Soli Deo Gloria"</p>
          </div>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-paris-gold transition-colors">{t('footer.policies.privacy')}</a>
            <a href="#" className="hover:text-paris-gold transition-colors">{t('footer.policies.terms')}</a>
            <a href="#" className="hover:text-paris-gold transition-colors">{t('footer.policies.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
