
import React, { useEffect } from 'react';
import { MapPin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Venue = () => {
  const { t, i18n } = useTranslation('venue');
  
  useEffect(() => {
    console.log("Venue component mounted");
    console.log("Current language:", i18n.language);
    console.log("Available namespaces:", i18n.options.ns);
    console.log("Loaded namespaces:", i18n.reportNamespaces?.getUsedNamespaces());
    console.log("Venue title from translations:", t('title', 'Fallback Venue Title'));
    console.log("Venue description from translations:", t('description', 'Fallback Description'));
    
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
  }, [t, i18n]);
  
  return (
    <section id="venue" className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal dark:text-white">{t('title')}</h2>
            <p className="text-lg mb-6 reveal dark:text-gray-200" style={{ transitionDelay: '100ms' }}>
              {t('description')}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start reveal dark:text-gray-200" style={{ transitionDelay: '200ms' }}>
                <MapPin className="text-paris-blue dark:text-paris-gold mr-3 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-medium">{t('address.name')}</span><br />
                  {t('address.street')}<br />
                  {t('address.city')}
                </p>
              </div>
              
              <div className="flex items-center reveal dark:text-gray-200" style={{ transitionDelay: '400ms' }}>
                <Mail className="text-paris-blue dark:text-paris-gold mr-3 flex-shrink-0" />
                <p>{t('contact.email')}</p>
              </div>
            </div>
            
            <div className="space-y-4 reveal dark:text-gray-200" style={{ transitionDelay: '500ms' }}>
              <h3 className="text-xl font-semibold dark:text-white">{t('transport.title')}</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm text-paris-blue dark:text-paris-gold">{t('transport.walk5')}</p>
                  <p className="text-sm">{t('transport.corentin')}</p>
                  <p className="text-sm">{t('transport.mairie')}</p>
                  <p className="text-sm">{t('transport.freres')}</p>
                </div>
                
                <div>
                  <p className="font-medium text-sm text-paris-blue dark:text-paris-gold">{t('transport.walk10')}</p>
                  <p className="text-sm">{t('transport.porte')}</p>
                </div>
                
                <div>
                  <p className="font-medium text-sm text-paris-blue dark:text-paris-gold">{t('transport.walk15')}</p>
                  <p className="text-sm">{t('transport.rer')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md h-[400px] md:h-auto reveal" style={{ transitionDelay: '200ms' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.5420672467256!2d2.2581277!3d48.847124099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67ae3f137b5cf%3A0x9dd1e865a23b4a44!2s133%20Rte%20de%20la%20Reine%2C%2092100%20Boulogne-Billancourt%2C%20France!5e0!3m2!1sen!2sus!4v1712600464712!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
