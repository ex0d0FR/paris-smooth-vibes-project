
import React from 'react';
import { MapPin, Clock, Phone, Star } from 'lucide-react';
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

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  const { t } = useTranslation('restaurants');

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(restaurant)}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {restaurant.name}
            </h3>
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
          
          <p className="text-paris-blue dark:text-paris-gold font-medium mb-2">
            {t(restaurant.typeKey)}
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t(restaurant.descriptionKey)}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{restaurant.address}</span>
              <span className="ml-2 text-xs bg-paris-blue/10 dark:bg-paris-gold/10 text-paris-blue dark:text-paris-gold px-2 py-1 rounded">
                {restaurant.distance}
              </span>
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{restaurant.hours}</span>
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Phone size={16} className="mr-2 flex-shrink-0" />
              <a href={`tel:${restaurant.phone}`} className="text-sm hover:text-paris-blue dark:hover:text-paris-gold transition-colors">
                {restaurant.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
