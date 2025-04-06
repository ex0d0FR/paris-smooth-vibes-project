
import React, { useEffect } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const About = () => {
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
    <section id="about" className="py-20 bg-paris-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 reveal">About The Conference</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg leading-relaxed mb-6 reveal">
              <span className="font-semibold text-paris-blue">PARIS 2025</span> brings together the brightest minds and industry leaders from around the globe to exchange ideas, discuss trends, and shape the future.
            </p>
            <p className="text-lg leading-relaxed mb-6 reveal" style={{ transitionDelay: '200ms' }}>
              Over four immersive days in the heart of Paris, attendees will engage in thought-provoking sessions, hands-on workshops, and unparalleled networking opportunities.
            </p>
            <p className="text-lg leading-relaxed reveal" style={{ transitionDelay: '400ms' }}>
              Whether you're a seasoned professional, a rising star, or simply passionate about innovation, PARIS 2025 promises an unforgettable experience that will inspire and empower.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conference Highlights */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-scale reveal" style={{ transitionDelay: '100ms' }}>
              <div className="bg-paris-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calendar className="text-paris-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4 Days</h3>
              <p className="text-gray-600">Of immersive sessions, workshops and networking events</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover-scale reveal" style={{ transitionDelay: '200ms' }}>
              <div className="bg-paris-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-paris-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">50+ Speakers</h3>
              <p className="text-gray-600">Thought leaders and experts from around the world</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover-scale reveal" style={{ transitionDelay: '300ms' }}>
              <div className="bg-paris-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MapPin className="text-paris-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Iconic Venues</h3>
              <p className="text-gray-600">Located in the heart of beautiful Paris</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover-scale reveal" style={{ transitionDelay: '400ms' }}>
              <div className="bg-paris-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-paris-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2,000+ Attendees</h3>
              <p className="text-gray-600">From over 60 countries worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
