import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation(['footer', 'nav']);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-paris-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">PARIS<span className="text-paris-gold">2025</span></h2>
            <p className="text-white/80 mb-4">
              {t('description', { ns: 'footer' })}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks', { ns: 'footer' })}</h3>
            <ul className="space-y-2">
              {[{
                key: 'home',
                label: t('home', { ns: 'nav' })
              }, {
                key: 'about',
                label: t('about', { ns: 'nav' })
              }, {
                key: 'speakers',
                label: t('speakers', { ns: 'nav' })
              }, {
                key: 'schedule',
                label: t('schedule', { ns: 'nav' })
              }, {
                key: 'venue',
                label: t('venue', { ns: 'nav' })
              }, {
                key: 'register',
                label: t('register', { ns: 'nav' })
              }].map(item => <li key={item.key}>
                <a href={`/#${item.key}`} className="text-white/80 hover:text-paris-gold transition-colors">
                  {item.label}
                </a>
              </li>)}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('conferenceInfo', { ns: 'footer' })}</h3>
            <ul className="space-y-2">
              <li><Link to="/visa-requirements" className="text-white/80 hover:text-paris-gold transition-colors">{t('infoItems.visa', { ns: 'footer' })}</Link></li>
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">{t('infoItems.travel', { ns: 'footer' })}</a></li>
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">{t('infoItems.accommodations', { ns: 'footer' })}</a></li>
              <li><Link to="/restaurants" onClick={scrollToTop} className="text-white/80 hover:text-paris-gold transition-colors">Restaurants</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactUs', { ns: 'footer' })}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <a href="mailto:info@puentesparis2025.net" className="text-white/80 hover:text-paris-gold transition-colors">
                  info@puentesparis2025.net
                </a>
              </div>
            </div>
            
            <div className="mt-8">
              
              
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 pb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold">{t('endorsedBy', { ns: 'footer' })}</h2>
            <p className="text-white/80 mt-3 max-w-3xl mx-auto">
              {t('endorsementDescription', { ns: 'footer' })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
            <div className="flex flex-col items-center justify-center text-center">
              <a href="https://kerygmaparis.fr/es/" target="_blank" rel="noopener noreferrer" className="inline-block mb-3">
                <img src="/lovable-uploads/f1a350f4-d210-4cad-9ad3-9e954ce61634.png" alt="Kerygma Paris" className="w-40 h-auto mx-auto" />
              </a>
              <p className="text-white/80 text-sm">
                {t('kerygma', { ns: 'footer' })}
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center">
              <a href="https://www.globalmissioncouncil.org/" target="_blank" rel="noopener noreferrer" className="inline-block mb-3">
                <img src="/lovable-uploads/dd272009-d49c-4a66-972c-5437dc84f909.png" alt="Global Council of Mission" className="w-40 h-auto mx-auto" />
              </a>
              <p className="text-white/80 text-sm">
                {t('globalCouncil', { ns: 'footer' })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <p>{t('copyright', { ns: 'footer' })}</p>
            <p className="italic">{t('developed', { ns: 'footer' })} <Heart size={14} className="inline text-paris-gold" /> for "Soli Deo Gloria"</p>
          </div>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-paris-gold transition-colors">{t('policies.privacy', { ns: 'footer' })}</Link>
            <Link to="/legal-notice" className="hover:text-paris-gold transition-colors">Legal Notice</Link>
            <Link to="/legal-notice" className="hover:text-paris-gold transition-colors">{t('policies.cookies', { ns: 'footer' })}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
