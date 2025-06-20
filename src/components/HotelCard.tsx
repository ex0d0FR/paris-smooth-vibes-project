
import React from 'react';
import { MapPin, Phone, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Hotel {
  name: string;
  address: string;
  phone: string;
  rating: number;
  distanceKey: string;
  price: string;
  amenities: string[];
  descriptionKey: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const { t } = useTranslation('accommodations');

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'restaurant': return <Utensils className="h-4 w-4" />;
      case 'fitness': return <Coffee className="h-4 w-4" />;
      default: return <Coffee className="h-4 w-4" />;
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{rating}</span>
      </div>
    );
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
            {hotel.name}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 shrink-0 bg-paris-blue dark:bg-paris-gold text-white dark:text-gray-900">
            {hotel.price}
          </Badge>
        </div>
        {renderStars(hotel.rating)}
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {t(hotel.descriptionKey)}
        </CardDescription>

        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-paris-blue dark:text-paris-gold mt-0.5 mr-2 shrink-0" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">{hotel.address}</p>
              <p className="text-paris-blue dark:text-paris-gold font-medium">{t(hotel.distanceKey)}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Phone className="h-4 w-4 text-paris-blue dark:text-paris-gold mr-2 shrink-0" />
            <a 
              href={`tel:${hotel.phone}`} 
              className="text-gray-700 dark:text-gray-300 hover:text-paris-blue dark:hover:text-paris-gold transition-colors"
            >
              {hotel.phone}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {hotel.amenities.map((amenity, idx) => (
            <div 
              key={idx} 
              className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 text-xs text-gray-600 dark:text-gray-300"
            >
              {getAmenityIcon(amenity)}
              <span className="ml-1 capitalize">{t(`amenities.${amenity}`)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
