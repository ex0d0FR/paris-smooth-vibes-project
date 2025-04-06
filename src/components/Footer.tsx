
import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-paris-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">PARIS<span className="text-paris-gold">2025</span></h2>
            <p className="text-white/80 mb-4">
              The most anticipated global conference bringing together thought leaders, innovators and changemakers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-paris-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-paris-gold transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-paris-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-paris-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Speakers', 'Schedule', 'Venue', 'Register'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-white/80 hover:text-paris-gold transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Conference Info</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">FAQs</a></li>
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">Travel Information</a></li>
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">Visa Requirements</a></li>
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">Accommodations</a></li>
              <li><a href="#" className="text-white/80 hover:text-paris-gold transition-colors">Media Kit</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <a href="mailto:info@paris2025.net" className="text-white/80 hover:text-paris-gold transition-colors">
                  info@paris2025.net
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <a href="tel:+33123456789" className="text-white/80 hover:text-paris-gold transition-colors">
                  +33 (0)1 23 45 67 89
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
          <p>&copy; {currentYear} PARIS 2025 Conference. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-paris-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-paris-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-paris-gold transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
