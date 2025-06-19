
import React, { useEffect } from 'react';
import { MapPin, Phone, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Accommodations = () => {
  const { t } = useTranslation('accommodations');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hotels = [
    {
      name: "Novotel Paris Issy Les Moulineaux",
      address: "2 Rue Guynemer, 92130 Issy-les-Moulineaux",
      phone: "+33 1 46 62 04 18",
      rating: 4.2,
      distance: t('hotels.novotel.distance'),
      price: "€150-200/night",
      amenities: ["wifi", "parking", "restaurant", "fitness"],
      description: t('hotels.novotel.description')
    },
    {
      name: "Hotel des Berceaux",
      address: "17 Rue du Général Leclerc, 92130 Issy-les-Moulineaux",
      phone: "+33 1 46 62 70 00",
      rating: 3.8,
      distance: t('hotels.berceaux.distance'),
      price: "€80-120/night",
      amenities: ["wifi", "restaurant"],
      description: t('hotels.berceaux.description')
    },
    {
      name: "Aparthotel Adagio Paris Malakoff Châtillon",
      address: "131 Avenue Pierre Brossolette, 92240 Malakoff",
      phone: "+33 1 46 12 65 65",
      rating: 4.0,
      distance: t('hotels.adagio.distance'),
      price: "€100-140/night",
      amenities: ["wifi", "parking", "kitchenette", "fitness"],
      description: t('hotels.adagio.description')
    },
    {
      name: "Hotel Mercure Paris Boulogne",
      address: "76 Route de la Reine, 92100 Boulogne-Billancourt",
      phone: "+33 1 46 99 15 15",
      rating: 4.1,
      distance: t('hotels.mercure.distance'),
      price: "€130-180/night",
      amenities: ["wifi", "parking", "restaurant", "bar"],
      description: t('hotels.mercure.description')
    },
    {
      name: "Ibis Paris Issy Les Moulineaux Val de Seine",
      address: "45 Boulevard Rodin, 92130 Issy-les-Moulineaux",
      phone: "+33 1 58 04 20 00",
      rating: 3.9,
      distance: t('hotels.ibis.distance'),
      price: "€90-130/night",
      amenities: ["wifi", "parking", "restaurant"],
      description: t('hotels.ibis.description')
    },
    {
      name: "Hotel Villa Sorel",
      address: "93 Boulevard de Montmorency, 75016 Paris",
      phone: "+33 1 45 20 83 20",
      rating: 4.3,
      distance: t('hotels.villa.distance'),
      price: "€180-250/night",
      amenities: ["wifi", "concierge", "garden", "bar"],
      description: t('hotels.villa.description')
    },
    {
      name: "Best Western Paris Porte de Versailles",
      address: "204 Rue de Vaugirard, 75015 Paris",
      phone: "+33 1 48 28 55 55",
      rating: 3.7,
      distance: t('hotels.bestWestern.distance'),
      price: "€110-160/night",
      amenities: ["wifi", "restaurant", "bar", "business center"],
      description: t('hotels.bestWestern.description')
    },
    {
      name: "Hôtel Résidence Henri IV",
      address: "50 Rue de Vanves, 92170 Vanves",
      phone: "+33 1 46 42 87 87",
      rating: 3.6,
      distance: t('hotels.henri.distance'),
      price: "€70-100/night",
      amenities: ["wifi", "kitchenette"],
      description: t('hotels.henri.description')
    }
  ];

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
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

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
            {hotels.map((hotel, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                      {hotel.name}
                    </CardTitle>
                    <Badge variant="secondary" className="ml-2 shrink-0 bg-paris-blue text-white">
                      {hotel.price}
                    </Badge>
                  </div>
                  {renderStars(hotel.rating)}
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm text-gray-600 leading-relaxed">
                    {hotel.description}
                  </CardDescription>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-paris-blue mt-0.5 mr-2 shrink-0" />
                      <div>
                        <p className="text-gray-700">{hotel.address}</p>
                        <p className="text-paris-blue font-medium">{hotel.distance}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-paris-blue mr-2 shrink-0" />
                      <a 
                        href={`tel:${hotel.phone}`} 
                        className="text-gray-700 hover:text-paris-blue transition-colors"
                      >
                        {hotel.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-1 capitalize">{t(`amenities.${amenity}`)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('tips.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-paris-blue mr-2">•</span>
                  {t('tips.bookEarly')}
                </li>
                <li className="flex items-start">
                  <span className="text-paris-blue mr-2">•</span>
                  {t('tips.mentionConference')}
                </li>
                <li className="flex items-start">
                  <span className="text-paris-blue mr-2">•</span>
                  {t('tips.shuttleService')}
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-paris-blue mr-2">•</span>
                  {t('tips.metroProximity')}
                </li>
                <li className="flex items-start">
                  <span className="text-paris-blue mr-2">•</span>
                  {t('tips.wifiQuality')}
                </li>
                <li className="flex items-start">
                  <span className="text-paris-blue mr-2">•</span>
                  {t('tips.cancellationPolicy')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Accommodations;
