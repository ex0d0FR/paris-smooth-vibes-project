
import React from 'react';
import { X, MapPin, Clock, Phone, Star, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Restaurant {
  name: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  rating: number;
  typeKey: string;
  descriptionKey: string;
  cuisine: string;
  status: string;
}

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({ restaurant, onClose }) => {
  const { t } = useTranslation('restaurants');

  if (!restaurant) return null;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address)}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{restaurant.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-paris-blue dark:text-paris-gold font-medium text-lg">
              {t(restaurant.typeKey)}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                  {restaurant.rating}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                restaurant.status === 'open' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {t(`search.statuses.${restaurant.status}`)}
              </span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t(restaurant.descriptionKey)}
          </p>

          <div className="space-y-3">
            <div className="flex items-start text-gray-600 dark:text-gray-400">
              <MapPin size={16} className="mr-3 mt-1 flex-shrink-0 text-paris-blue dark:text-paris-gold" />
              <div>
                <span className="text-sm">{restaurant.address}</span>
                <div className="text-xs bg-paris-blue/10 dark:bg-paris-gold/10 text-paris-blue dark:text-paris-gold px-2 py-1 rounded mt-1 inline-block">
                  {restaurant.distance}
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock size={16} className="mr-3 flex-shrink-0 text-paris-blue dark:text-paris-gold" />
              <span className="text-sm">{restaurant.hours}</span>
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Phone size={16} className="mr-3 flex-shrink-0 text-paris-blue dark:text-paris-gold" />
              <a href={`tel:${restaurant.phone}`} className="text-sm hover:text-paris-blue dark:hover:text-paris-gold transition-colors">
                {restaurant.phone}
              </a>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Location & Navigation</h3>
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
                className="flex items-center justify-center px-4 py-2 bg-paris-gold hover:bg-paris-gold/90 text-gray-900 rounded-lg transition-colors"
              >
                Get Directions
                <ExternalLink size={14} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailModal;
