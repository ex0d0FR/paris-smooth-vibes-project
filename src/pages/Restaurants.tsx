import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RestaurantDetailModal from '@/components/RestaurantDetailModal';
import RestaurantSearchFilters from '@/components/RestaurantSearchFilters';
import RestaurantList from '@/components/RestaurantList';
import RestaurantTips from '@/components/RestaurantTips';

const Restaurants = () => {
  const { t } = useTranslation('restaurants');
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restaurants = [
    {
      name: "Loulou Boulogne",
      address: "8 Cours de l'Île Seguin, 92100 Boulogne-Billancourt",
      distance: "1.2 km",
      phone: "+33 1 46 99 42 00",
      hours: "10:00 - 00:00",
      rating: 4.2,
      typeKey: "restaurants.0.type",
      descriptionKey: "restaurants.0.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "Les Galopins Boulogne",
      address: "17 Rue Paul Bert, 92100 Boulogne-Billancourt",
      distance: "0.8 km",
      phone: "+33 1 46 05 17 27",
      hours: "12:00 - 14:30, 19:00 - 22:30",
      rating: 4.1,
      typeKey: "restaurants.1.type",
      descriptionKey: "restaurants.1.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "La Machine à Coudes",
      address: "34 Avenue Jean Baptiste Clément, 92100 Boulogne-Billancourt",
      distance: "0.6 km",
      phone: "+33 1 46 04 63 11",
      hours: "12:00 - 14:30, 19:30 - 22:30",
      rating: 4.4,
      typeKey: "restaurants.2.type",
      descriptionKey: "restaurants.2.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "Volfoni Boulogne-Billancourt",
      address: "12 Avenue Édouard Vaillant, 92100 Boulogne-Billancourt",
      distance: "0.5 km",
      phone: "+33 1 46 99 42 15",
      hours: "11:30 - 15:00, 18:00 - 23:00",
      rating: 4.0,
      typeKey: "restaurants.3.type",
      descriptionKey: "restaurants.3.description",
      cuisine: "italian",
      status: "open"
    },
    {
      name: "Sushi Shop Boulogne",
      address: "45 Route de la Reine, 92100 Boulogne-Billancourt",
      distance: "0.9 km",
      phone: "+33 1 46 21 07 89",
      hours: "11:00 - 15:00, 18:00 - 22:30",
      rating: 3.9,
      typeKey: "restaurants.4.type",
      descriptionKey: "restaurants.4.description",
      cuisine: "japanese",
      status: "open"
    },
    {
      name: "Le Bistrot du Point du Jour",
      address: "156 Route de la Reine, 92100 Boulogne-Billancourt",
      distance: "0.3 km",
      phone: "+33 1 46 03 25 47",
      hours: "07:00 - 21:00",
      rating: 4.2,
      typeKey: "restaurants.5.type",
      descriptionKey: "restaurants.5.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "Tandoor Palace Boulogne",
      address: "28 Avenue Jean Baptiste Clément, 92100 Boulogne-Billancourt",
      distance: "0.7 km",
      phone: "+33 1 46 04 85 92",
      hours: "12:00 - 14:30, 19:00 - 23:00",
      rating: 4.1,
      typeKey: "restaurants.6.type",
      descriptionKey: "restaurants.6.description",
      cuisine: "indian",
      status: "open"
    },
    {
      name: "McDonald's Boulogne-Billancourt",
      address: "Centre Commercial Val de Seine, 92100 Boulogne-Billancourt",
      distance: "1.0 km",
      phone: "+33 1 46 99 15 78",
      hours: "08:00 - 24:00",
      rating: 3.5,
      typeKey: "restaurants.7.type",
      descriptionKey: "restaurants.7.description",
      cuisine: "fastfood",
      status: "open"
    },
    {
      name: "Le Comptoir Libanais Boulogne",
      address: "67 Avenue Édouard Vaillant, 92100 Boulogne-Billancourt",
      distance: "0.8 km",
      phone: "+33 1 46 05 42 33",
      hours: "11:30 - 15:00, 18:00 - 23:00",
      rating: 4.3,
      typeKey: "restaurants.8.type",
      descriptionKey: "restaurants.8.description",
      cuisine: "lebanese",
      status: "open"
    },
    {
      name: "Brasserie Point du Jour",
      address: "124 Route de la Reine, 92100 Boulogne-Billancourt",
      distance: "0.4 km",
      phone: "+33 1 46 03 78 45",
      hours: "12:00 - 14:00, 19:30 - 22:00",
      rating: 4.0,
      typeKey: "restaurants.9.type",
      descriptionKey: "restaurants.9.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "Pizza Corner Boulogne",
      address: "88 Avenue Édouard Vaillant, 92100 Boulogne-Billancourt",
      distance: "0.9 km",
      phone: "+33 1 46 21 56 78",
      hours: "11:30 - 14:30, 18:00 - 23:30",
      rating: 3.8,
      typeKey: "restaurants.10.type",
      descriptionKey: "restaurants.10.description",
      cuisine: "italian",
      status: "open"
    },
    {
      name: "Le Paradis du Fruit Boulogne",
      address: "15 Rue de Silly, 92100 Boulogne-Billancourt",
      distance: "1.1 km",
      phone: "+33 1 46 04 67 89",
      hours: "08:00 - 20:00",
      rating: 4.0,
      typeKey: "restaurants.11.type",
      descriptionKey: "restaurants.11.description",
      cuisine: "healthy",
      status: "open"
    },
    {
      name: "Boulangerie du Point du Jour",
      address: "142 Route de la Reine, 92100 Boulogne-Billancourt",
      distance: "0.2 km",
      phone: "+33 1 46 03 34 67",
      hours: "06:30 - 20:00",
      rating: 4.2,
      typeKey: "restaurants.12.type",
      descriptionKey: "restaurants.12.description",
      cuisine: "bakery",
      status: "open"
    },
    {
      name: "Boulangerie Patisserie Vincent",
      address: "78 Avenue Jean Baptiste Clément, 92100 Boulogne-Billancourt",
      distance: "0.7 km",
      phone: "+33 1 46 04 56 89",
      hours: "06:00 - 19:30",
      rating: 4.1,
      typeKey: "restaurants.13.type",
      descriptionKey: "restaurants.13.description",
      cuisine: "bakery",
      status: "open"
    },
    {
      name: "La Factory Burger Boulogne",
      address: "22 Avenue Édouard Vaillant, 92100 Boulogne-Billancourt",
      distance: "0.6 km",
      phone: "+33 1 46 21 67 34",
      hours: "11:30 - 23:00",
      rating: 3.9,
      typeKey: "restaurants.14.type",
      descriptionKey: "restaurants.14.description",
      cuisine: "fastfood",
      status: "open"
    }
  ];

  // Filter restaurants based on search and filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t(restaurant.descriptionKey).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
    const matchesStatus = statusFilter === 'all' || restaurant.status === statusFilter;
    
    return matchesSearch && matchesCuisine && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>{t('title')} - PARIS 2025</title>
        <meta name="description" content={t('subtitle')} />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                {t('title')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                {t('subtitle')}
              </p>

              {/* Reference Point Info */}
              <div className="bg-paris-blue/10 dark:bg-paris-gold/10 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-center text-paris-blue dark:text-paris-gold">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm font-medium">
                    {t('search.referencePoint')}: 133 Rte de la Reine, 92100 Boulogne-Billancourt
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {t('search.searchRadius')}: 700 {t('search.meters')}
                </div>
              </div>

              <RestaurantSearchFilters
                searchTerm={searchTerm}
                cuisineFilter={cuisineFilter}
                statusFilter={statusFilter}
                onSearchChange={setSearchTerm}
                onCuisineChange={setCuisineFilter}
                onStatusChange={setStatusFilter}
              />
            </div>

            <RestaurantList
              restaurants={filteredRestaurants}
              onRestaurantClick={setSelectedRestaurant}
            />

            <RestaurantTips />
          </div>
        </div>
      </main>

      <RestaurantDetailModal 
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
      
      <Footer />
    </>
  );
};

export default Restaurants;