
import React, { useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Venue = () => {
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
  
  return (
    <section id="venue" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">{t('venue.title')}</h2>
            <p className="text-lg mb-6 reveal" style={{ transitionDelay: '100ms' }}>
              {t('venue.description')}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start reveal" style={{ transitionDelay: '200ms' }}>
                <MapPin className="text-paris-blue mr-3 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-medium">{t('venue.address.name')}</span><br />
                  {t('venue.address.street')}<br />
                  {t('venue.address.city')}
                </p>
              </div>
              
              <div className="flex items-center reveal" style={{ transitionDelay: '300ms' }}>
                <Phone className="text-paris-blue mr-3 flex-shrink-0" />
                <p>{t('venue.contact.phone')}</p>
              </div>
              
              <div className="flex items-center reveal" style={{ transitionDelay: '400ms' }}>
                <Mail className="text-paris-blue mr-3 flex-shrink-0" />
                <p>{t('venue.contact.email')}</p>
              </div>
            </div>
            
            <div className="space-y-4 reveal" style={{ transitionDelay: '500ms' }}>
              <h3 className="text-xl font-semibold">{t('venue.transport.title')}</h3>
              <p><span className="font-medium">{t('venue.transport.metro')}</span></p>
              <p><span className="font-medium">{t('venue.transport.rer')}</span></p>
              <p><span className="font-medium">{t('venue.transport.bus')}</span></p>
              <p><span className="font-medium">{t('venue.transport.cdg')}</span></p>
              <p><span className="font-medium">{t('venue.transport.orly')}</span></p>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md h-[400px] md:h-auto reveal" style={{ transitionDelay: '200ms' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.1371580684896!2d2.2835103!3d48.8794645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f91c9eb656d%3A0xe54fe41b6eff8a8f!2sPalais%20des%20Congr%C3%A8s%20de%20Paris!5e0!3m2!1sen!2sus!4v1655937254169!5m2!1sen!2sus" 
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
