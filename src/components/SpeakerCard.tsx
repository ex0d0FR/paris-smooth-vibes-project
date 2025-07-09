
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Speaker } from '@/data/speakersData';
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, index }) => {
  const { t } = useTranslation('speakers');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log(`Image loaded successfully for ${speaker.name}`);
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

  // Fallback image when the main image fails to load
  const fallbackAvatarStyle = {
    background: speaker.id % 5 === 0 ? '#4F46E5' : 
                speaker.id % 4 === 0 ? '#059669' :
                speaker.id % 3 === 0 ? '#DB2777' :
                speaker.id % 2 === 0 ? '#D97706' : '#7C3AED',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontSize: '1.5rem',
    fontWeight: 'bold'
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
            <AvatarFallback 
              className="text-lg font-bold"
              style={imageError ? fallbackAvatarStyle : {}}
            >
              {getInitials(speaker.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <h3 className="text-xl font-semibold mb-1 text-center dark:text-white">{speaker.name}</h3>
        <p className="text-paris-blue dark:text-paris-gold font-medium text-center">
          {t(`roles.${speaker.roleKey}`, speaker.role)}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-center">{speaker.company}</p>
      </CardContent>
    </Card>
  );
};

export default SpeakerCard;
