
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Twitter } from 'lucide-react';

interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
}

const speakersData: Speaker[] = [
  {
    id: 1,
    name: 'Sophie Laurent',
    role: 'Design Director',
    company: 'Atelier Moderne',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Leading innovative design strategies across digital and physical experiences.'
  },
  {
    id: 2,
    name: 'Michel Dubois',
    role: 'Tech Innovator',
    company: 'NexGen Solutions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Pioneering the future of technology through sustainable, user-centered solutions.'
  },
  {
    id: 3,
    name: 'Amara Khan',
    role: 'Global Strategist',
    company: 'Horizon Partners',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Helping organizations navigate complex global challenges with innovative approaches.'
  },
  {
    id: 4,
    name: 'Carlos Rivera',
    role: 'Creative Director',
    company: 'Studio Lumière',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Blending art and technology to create immersive brand experiences worldwide.'
  },
];

const Speakers = () => {
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
    <section id="speakers" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 reveal">Our Speakers</h2>
        <p className="text-lg text-center mb-16 max-w-3xl mx-auto text-gray-600 reveal" style={{ transitionDelay: '100ms' }}>
          Hear from pioneers, innovators, and thought leaders who are shaping the future
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {speakersData.map((speaker, index) => (
            <div 
              key={speaker.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover-scale reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 bg-paris-blue/5">
                <Avatar className="w-40 h-40 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white">
                  <AvatarImage src={speaker.image} alt={speaker.name} />
                  <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-1">{speaker.name}</h3>
                <p className="text-paris-blue font-medium">{speaker.role}</p>
                <p className="text-gray-500 mb-4">{speaker.company}</p>
                <p className="text-gray-600 mb-4 text-sm">{speaker.bio}</p>
                <div className="flex justify-center space-x-3">
                  <button className="text-paris-blue hover:text-paris-navy transition-colors">
                    <Twitter size={18} />
                  </button>
                  <button className="text-paris-blue hover:text-paris-navy transition-colors">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center reveal" style={{ transitionDelay: '600ms' }}>
          <Button variant="outline" className="border-paris-blue text-paris-blue hover:bg-paris-blue hover:text-white">
            View All Speakers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
