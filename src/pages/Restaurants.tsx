import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, Phone, Star, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RestaurantDetailModal from '@/components/RestaurantDetailModal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  // Get tips items with proper type casting
  const tipsItems = t('tips.items', { returnObjects: true });
  const tipsArray = Array.isArray(tipsItems) ? tipsItems : [];

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

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder={t('search.placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                
                <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                  <SelectTrigger className="w-full md:w-64 h-12">
                    <SelectValue placeholder={t('search.allCuisines')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('search.allCuisines')}</SelectItem>
                    <SelectItem value="french">{t('search.cuisines.french')}</SelectItem>
                    <SelectItem value="italian">{t('search.cuisines.italian')}</SelectItem>
                    <SelectItem value="japanese">{t('search.cuisines.japanese')}</SelectItem>
                    <SelectItem value="lebanese">{t('search.cuisines.lebanese')}</SelectItem>
                    <SelectItem value="indian">{t('search.cuisines.indian')}</SelectItem>
                    <SelectItem value="fastfood">{t('search.cuisines.fastfood')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <SelectValue placeholder={t('search.allStatuses')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('search.allStatuses')}</SelectItem>
                    <SelectItem value="open">{t('search.statuses.open')}</SelectItem>
                    <SelectItem value="closed">{t('search.statuses.closed')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedRestaurant(restaurant)}
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
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {t('search.noResults')}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-12 bg-paris-blue/5 dark:bg-paris-gold/5 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('tips.title')}</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {tipsArray.map((tip: string, index: number) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
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
