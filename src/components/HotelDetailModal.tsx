
import React from 'react';
import { X, MapPin, Phone, Star, ExternalLink, Wifi, Car, Utensils, Coffee } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

interface HotelDetailModalProps {
  hotel: Hotel | null;
  onClose: () => void;
}

const HotelDetailModal: React.FC<HotelDetailModalProps> = ({ hotel, onClose }) => {
  const { t } = useTranslation('accommodations');

  if (!hotel) return null;

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

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotel.address)}`;
  const bookingUrl = `https://www.booking.com/search.html?ss=${encodeURIComponent(hotel.name + ' ' + hotel.address)}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <div className="flex items-center justify-between w-full mr-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{hotel.name}</h2>
            <div className="flex items-center gap-3">
              <span className="bg-paris-blue dark:bg-paris-gold text-white dark:text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                {hotel.price}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex-shrink-0"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            {renderStars(hotel.rating)}
            <span className="text-paris-blue dark:text-paris-gold font-medium">
              {t(hotel.distanceKey)}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t(hotel.descriptionKey)}
          </p>

          <div className="space-y-3">
            <div className="flex items-start text-gray-600 dark:text-gray-400">
              <MapPin size={16} className="mr-3 mt-1 flex-shrink-0 text-paris-blue dark:text-paris-gold" />
              <div>
                <span className="text-sm">{hotel.address}</span>
                <div className="text-xs bg-paris-blue/10 dark:bg-paris-gold/10 text-paris-blue dark:text-paris-gold px-2 py-1 rounded mt-1 inline-block">
                  {t(hotel.distanceKey)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Phone size={16} className="mr-3 flex-shrink-0 text-paris-blue dark:text-paris-gold" />
              <a href={`tel:${hotel.phone}`} className="text-sm hover:text-paris-blue dark:hover:text-paris-gold transition-colors">
                {hotel.phone}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  {getAmenityIcon(amenity)}
                  <span className="ml-2 capitalize">{t(`amenities.${amenity}`)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Location & Booking</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-paris-blue hover:bg-paris-blue/90 text-white rounded-lg transition-colors"
              >
                <MapPin size={16} className="mr-2" />
                View on Map
                <ExternalLink size={14} className="ml-2" />
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Get Directions
                <ExternalLink size={14} className="ml-2" />
              </a>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-paris-gold hover:bg-paris-gold/90 text-gray-900 rounded-lg transition-colors"
              >
                Book Now
                <ExternalLink size={14} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailModal;
