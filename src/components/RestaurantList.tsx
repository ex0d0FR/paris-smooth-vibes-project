
import React from 'react';
import { useTranslation } from 'react-i18next';
import RestaurantCard from './RestaurantCard';

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

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantClick }) => {
  const { t } = useTranslation('restaurants');

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {t('search.noResults')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {restaurants.map((restaurant, index) => (
        <RestaurantCard
          key={index}
          restaurant={restaurant}
          onClick={onRestaurantClick}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
