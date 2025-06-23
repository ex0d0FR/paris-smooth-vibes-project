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
      name: "Le Bistrot d'Issy",
      address: "12 Rue du Général Leclerc, 92130 Issy-les-Moulineaux",
      distance: "0.3 km",
      phone: "+33 1 46 42 15 78",
      hours: "12:00 - 14:30, 19:00 - 22:30",
      rating: 4.2,
      typeKey: "restaurants.0.type",
      descriptionKey: "restaurants.0.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "Pizza Roma",
      address: "25 Avenue Victor Cresson, 92130 Issy-les-Moulineaux",
      distance: "0.4 km",
      phone: "+33 1 46 42 89 12",
      hours: "11:30 - 14:00, 18:30 - 23:00",
      rating: 4.0,
      typeKey: "restaurants.1.type",
      descriptionKey: "restaurants.1.description",
      cuisine: "italian",
      status: "open"
    },
    {
      name: "Brasserie du Pont",
      address: "8 Rue Aristide Briand, 92130 Issy-les-Moulineaux",
      distance: "0.5 km",
      phone: "+33 1 46 42 33 44",
      hours: "07:00 - 23:00",
      rating: 4.3,
      typeKey: "restaurants.2.type",
      descriptionKey: "restaurants.2.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "Sushi Zen",
      address: "18 Rue de l'Égalité, 92130 Issy-les-Moulineaux",
      distance: "0.6 km",
      phone: "+33 1 46 42 67 89",
      hours: "12:00 - 14:30, 19:00 - 22:00",
      rating: 4.1,
      typeKey: "restaurants.3.type",
      descriptionKey: "restaurants.3.description",
      cuisine: "japanese",
      status: "open"
    },
    {
      name: "Le Comptoir Libanais",
      address: "31 Rue Camille Desmoulins, 92130 Issy-les-Moulineaux",
      distance: "0.7 km",
      phone: "+33 1 46 42 55 23",
      hours: "11:30 - 15:00, 18:00 - 23:00",
      rating: 4.4,
      typeKey: "restaurants.4.type",
      descriptionKey: "restaurants.4.description",
      cuisine: "lebanese",
      status: "open"
    },
    {
      name: "Café de la Mairie",
      address: "2 Place Jacques Madaule, 92130 Issy-les-Moulineaux",
      distance: "0.8 km",
      phone: "+33 1 46 42 12 34",
      hours: "07:00 - 19:00",
      rating: 3.9,
      typeKey: "restaurants.5.type",
      descriptionKey: "restaurants.5.description",
      cuisine: "french",
      status: "closed"
    },
    {
      name: "Tandoor Palace",
      address: "45 Avenue de la République, 92130 Issy-les-Moulineaux",
      distance: "0.9 km",
      phone: "+33 1 46 42 78 90",
      hours: "12:00 - 14:30, 19:00 - 23:00",
      rating: 4.2,
      typeKey: "restaurants.6.type",
      descriptionKey: "restaurants.6.description",
      cuisine: "indian",
      status: "open"
    },
    {
      name: "McDonald's Issy-Les-Moulineaux",
      address: "Centre Commercial Les Trois Moulins, 92130 Issy-les-Moulineaux",
      distance: "1.0 km",
      phone: "+33 1 46 42 90 12",
      hours: "08:00 - 24:00",
      rating: 3.5,
      typeKey: "restaurants.7.type",
      descriptionKey: "restaurants.7.description",
      cuisine: "fastfood",
      status: "open"
    },
    {
      name: "Restaurant Issy l'Asie",
      address: "7 Rdpt Victor Hugo, 92130 Issy-les-Moulineaux",
      distance: "0.6 km",
      phone: "+33 1 46 42 45 67",
      hours: "12:00 - 14:30, 19:00 - 22:30",
      rating: 4.0,
      typeKey: "restaurants.8.type",
      descriptionKey: "restaurants.8.description",
      cuisine: "asian",
      status: "open"
    },
    {
      name: "Estelle et Julien",
      address: "30 Rue du Général Leclerc, 92130 Issy-les-Moulineaux",
      distance: "0.3 km",
      phone: "+33 1 46 42 78 45",
      hours: "12:00 - 14:00, 19:30 - 22:00",
      rating: 4.5,
      typeKey: "restaurants.9.type",
      descriptionKey: "restaurants.9.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "La Côte et l'Arête",
      address: "Face au cinéma UGC Issy, 2 Prom. Coeur de Ville, 92130 Issy-les-Moulineaux",
      distance: "0.4 km",
      phone: "+33 1 46 42 56 78",
      hours: "11:30 - 24:00",
      rating: 4.3,
      typeKey: "restaurants.10.type",
      descriptionKey: "restaurants.10.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "Le Nida",
      address: "11 Prom. Coeur de Ville, 92130 Issy-les-Moulineaux",
      distance: "0.4 km",
      phone: "+33 1 46 42 34 56",
      hours: "12:00 - 14:30, 19:00 - 22:30",
      rating: 4.1,
      typeKey: "restaurants.11.type",
      descriptionKey: "restaurants.11.description",
      cuisine: "french",
      status: "open"
    },
    {
      name: "Le Paradis du Fruit",
      address: "22 Rue Horace Vernet, 92130 Issy-les-Moulineaux",
      distance: "0.5 km",
      phone: "+33 1 46 42 67 89",
      hours: "08:00 - 20:00",
      rating: 4.0,
      typeKey: "restaurants.12.type",
      descriptionKey: "restaurants.12.description",
      cuisine: "healthy",
      status: "open"
    },
    {
      name: "Uncle Jack",
      address: "2 Av. Jean Jaurès, 92130 Issy-les-Moulineaux",
      distance: "0.7 km",
      phone: "+33 1 46 42 89 01",
      hours: "11:00 - 23:00",
      rating: 3.8,
      typeKey: "restaurants.13.type",
      descriptionKey: "restaurants.13.description",
      cuisine: "fastfood",
      status: "open"
    },
    {
      name: "Mangez Moi",
      address: "7 Rue Jean Pierre Timbaud, 92130 Issy-les-Moulineaux",
      distance: "0.8 km",
      phone: "+33 1 46 42 12 89",
      hours: "11:30 - 22:00",
      rating: 3.6,
      typeKey: "restaurants.14.type",
      descriptionKey: "restaurants.14.description",
      cuisine: "fastfood",
      status: "open"
    },
    {
      name: "McDonald's Paul Vaillant Couturier",
      address: "4 Pl. Paul Vaillant Couturier, 92130 Issy-les-Moulineaux",
      distance: "0.9 km",
      phone: "+33 1 46 42 45 78",
      hours: "07:00 - 24:00",
      rating: 3.4,
      typeKey: "restaurants.15.type",
      descriptionKey: "restaurants.15.description",
      cuisine: "fastfood",
      status: "open"
    },
    {
      name: "La Factory Burger",
      address: "16 Rue René Jacques, 92130 Issy-les-Moulineaux",
      distance: "0.6 km",
      phone: "+33 1 46 42 67 34",
      hours: "11:30 - 23:00",
      rating: 3.9,
      typeKey: "restaurants.16.type",
      descriptionKey: "restaurants.16.description",
      cuisine: "fastfood",
      status: "open"
    },
    {
      name: "Mf chicken Issy-les-Moulineaux",
      address: "54 Avenue Victor Cresson, 92130 Issy-les-Moulineaux",
      distance: "0.7 km",
      phone: "+33 1 46 42 78 12",
      hours: "11:00 - 23:00",
      rating: 3.7,
      typeKey: "restaurants.17.type",
      descriptionKey: "restaurants.17.description",
      cuisine: "fastfood",
      status: "open"
    },
    {
      name: "Aux Délices de l'Etoile Issy",
      address: "2 Bd Voltaire, 92130 Issy-les-Moulineaux",
      distance: "0.5 km",
      phone: "+33 1 46 42 34 67",
      hours: "06:30 - 20:00",
      rating: 4.2,
      typeKey: "restaurants.18.type",
      descriptionKey: "restaurants.18.description",
      cuisine: "bakery",
      status: "open"
    },
    {
      name: "Boulangerie Jan",
      address: "112 Bd Gallieni, 92130 Issy-les-Moulineaux",
      distance: "0.8 km",
      phone: "+33 1 46 42 56 89",
      hours: "06:00 - 19:30",
      rating: 4.1,
      typeKey: "restaurants.19.type",
      descriptionKey: "restaurants.19.description",
      cuisine: "bakery",
      status: "open"
    },
    {
      name: "Boulangerie Issy-Val-De-Seine",
      address: "74 Rue Camille Desmoulins, 92130 Issy-les-Moulineaux",
      distance: "0.6 km",
      phone: "+33 1 46 42 67 12",
      hours: "06:30 - 20:00",
      rating: 4.0,
      typeKey: "restaurants.20.type",
      descriptionKey: "restaurants.20.description",
      cuisine: "bakery",
      status: "open"
    },
    {
      name: "La Fournée des Isséens",
      address: "36 BIS Rue Ernest Renan, 92130 Issy-les-Moulineaux",
      distance: "0.7 km",
      phone: "+33 1 46 42 89 34",
      hours: "06:00 - 19:00",
      rating: 4.3,
      typeKey: "restaurants.21.type",
      descriptionKey: "restaurants.21.description",
      cuisine: "bakery",
      status: "open"
    },
    {
      name: "Boulangerie Blavette - Au Pain d'Issy",
      address: "22 Rue Ernest Renan, 92130 Issy-les-Moulineaux",
      distance: "0.7 km",
      phone: "+33 1 46 42 45 67",
      hours: "06:30 - 19:30",
      rating: 4.1,
      typeKey: "restaurants.22.type",
      descriptionKey: "restaurants.22.description",
      cuisine: "bakery",
      status: "open"
    },
    {
      name: "La Boulangerie Bio Selon",
      address: "5 bis Rue Aristide Briand, 92130 Issy-les-Moulineaux",
      distance: "0.5 km",
      phone: "+33 1 46 42 78 90",
      hours: "07:00 - 19:00",
      rating: 4.4,
      typeKey: "restaurants.23.type",
      descriptionKey: "restaurants.23.description",
      cuisine: "bakery",
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
                    {t('search.referencePoint')}: 19 Rue Victor Hugo, 92130 Issy-les-Moulineaux
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
