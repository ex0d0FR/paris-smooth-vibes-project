
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import BookingTips from '../components/BookingTips';
import { hotelsData } from '../data/hotelsData';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Accommodations = () => {
  const { t } = useTranslation('accommodations');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter hotels based on search criteria
  const filteredHotels = hotelsData.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'luxury' && hotel.rating >= 4.0) ||
                           (selectedCategory === 'budget' && hotel.rating < 4.0) ||
                           (selectedCategory === 'business' && hotel.amenities.includes('business center'));
    
    const priceValue = parseInt(hotel.price.match(/\d+/)?.[0] || '0');
    const matchesPrice = selectedPriceRange === 'all' ||
                        (selectedPriceRange === 'budget' && priceValue < 100) ||
                        (selectedPriceRange === 'mid' && priceValue >= 100 && priceValue < 150) ||
                        (selectedPriceRange === 'luxury' && priceValue >= 150);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20">
        <div className="bg-paris-navy dark:bg-gray-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {t('title')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue placeholder={t('search.allCategories')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectItem value="all" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    {t('search.allCategories')}
                  </SelectItem>
                  <SelectItem value="luxury" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    {t('search.categories.luxury')}
                  </SelectItem>
                  <SelectItem value="business" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    {t('search.categories.business')}
                  </SelectItem>
                  <SelectItem value="budget" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    {t('search.categories.budget')}
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Price Range Filter */}
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue placeholder={t('search.allPrices')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectItem value="all" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    {t('search.allPrices')}
                  </SelectItem>
                  <SelectItem value="budget" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    {t('search.priceRanges.budget')}
                  </SelectItem>
                  <SelectItem value="mid" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    {t('search.priceRanges.mid')}
                  </SelectItem>
                  <SelectItem value="luxury" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    {t('search.priceRanges.luxury')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('sectionTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('sectionDescription')}
            </p>
            {filteredHotels.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {filteredHotels.length} {t('search.hotelsFound')}
              </p>
            )}
          </div>

          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {t('search.noResults')}
              </p>
            </div>
          )}

          <BookingTips />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Accommodations;
