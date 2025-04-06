
import React, { useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Venue = () => {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">Venue Information</h2>
            <p className="text-lg mb-6 reveal" style={{ transitionDelay: '100ms' }}>
              PARIS 2025 will take place at the prestigious Palais des Congrès, a state-of-the-art conference center in the heart of Paris.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start reveal" style={{ transitionDelay: '200ms' }}>
                <MapPin className="text-paris-blue mr-3 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-medium">Palais des Congrès de Paris</span><br />
                  2 Place de la Porte Maillot,<br />
                  75017 Paris, France
                </p>
              </div>
              
              <div className="flex items-center reveal" style={{ transitionDelay: '300ms' }}>
                <Phone className="text-paris-blue mr-3 flex-shrink-0" />
                <p>+33 (0)1 40 68 22 22</p>
              </div>
              
              <div className="flex items-center reveal" style={{ transitionDelay: '400ms' }}>
                <Mail className="text-paris-blue mr-3 flex-shrink-0" />
                <p>info@paris2025.net</p>
              </div>
            </div>
            
            <div className="space-y-4 reveal" style={{ transitionDelay: '500ms' }}>
              <h3 className="text-xl font-semibold">Getting There</h3>
              <p><span className="font-medium">By Metro:</span> Line 1, Porte Maillot station</p>
              <p><span className="font-medium">By RER:</span> Line C, Neuilly - Porte Maillot station</p>
              <p><span className="font-medium">By Bus:</span> Lines 43, 73, 82, PC1, PC3</p>
              <p><span className="font-medium">From Charles de Gaulle Airport:</span> 45 minutes by taxi or Air France shuttle</p>
              <p><span className="font-medium">From Orly Airport:</span> 30 minutes by taxi</p>
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
