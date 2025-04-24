
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
  };
  
  const handleImageError = () => {
    console.error(`Image failed to load for ${speaker.name}`, {
      imagePath: speaker.image,
      speakerId: speaker.id
    });
    setImageError(true);
  };

  // Generate initials for fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Card 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover-scale reveal"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          {!imageLoaded && !imageError && (
            <Skeleton className="w-24 h-24 absolute rounded-full" />
          )}
          <Avatar className="w-24 h-24 border-2 border-paris-blue dark:border-paris-gold">
            <AvatarImage 
              src={speaker.image}
              alt={speaker.name} 
              className="object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <AvatarFallback className="text-lg font-bold">
              {getInitials(speaker.name)}
            </AvatarFallback>
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
