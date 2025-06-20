
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import BookingTips from '../components/BookingTips';
import { hotelsData } from '../data/hotelsData';

const Accommodations = () => {
  const { t } = useTranslation('accommodations');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <div className="bg-paris-navy text-white py-16">
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
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sectionTitle')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('sectionDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelsData.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>

          <BookingTips />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Accommodations;
