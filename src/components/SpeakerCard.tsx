
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Speaker } from '@/data/speakersData';

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, index }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log(`Image loaded successfully for ${speaker.name}`, {
      imagePath: speaker.image
    });
  };
  
  const handleImageError = () => {
    console.error(`Image failed to load for ${speaker.name}`, {
      imagePath: speaker.image,
      speakerId: speaker.id
    });
    setImageError(true);
  };

  // Preload image to check if it loads correctly
  useEffect(() => {
    const img = new Image();
    img.src = speaker.image;
    img.onload = handleImageLoad;
    img.onerror = handleImageError;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [speaker.image]);

  return (
    <Card 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover-scale reveal"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          {!imageLoaded && !imageError && (
            <Skeleton className="w-24 h-24 absolute" />
          )}
          <Avatar className="w-24 h-24 border-2 border-paris-blue dark:border-paris-gold">
            {imageError ? (
              <AvatarFallback>
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt={`Placeholder for ${speaker.name}`} 
                  className="w-full h-full object-cover"
                />
              </AvatarFallback>
            ) : (
              <>
                <AvatarImage 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className="object-cover"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                <AvatarFallback>
                  {speaker.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </>
            )}
          </Avatar>
        </div>
        <h3 className="text-xl font-semibold mb-1 text-center dark:text-white">{speaker.name}</h3>
        <p className="text-paris-blue dark:text-paris-gold font-medium text-center">{speaker.role}</p>
        <p className="text-gray-500 dark:text-gray-400 text-center">{speaker.company}</p>
      </CardContent>
    </Card>
  );
};

export default SpeakerCard;
