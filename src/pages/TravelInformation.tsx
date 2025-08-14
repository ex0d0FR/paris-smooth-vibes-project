import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TravelInformation = () => {
  const { t } = useTranslation('travel');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')} - Paris 2025</title>
        <meta name="description" content={t('pageDescription')} />
      </Helmet>
      
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 pt-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Getting to Paris */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t('gettingToParis.title')}
                </CardTitle>
                <CardDescription>
                  {t('gettingToParis.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('gettingToParis.byAir.title')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('gettingToParis.byAir.items.0')}</li>
                    <li>• {t('gettingToParis.byAir.items.1')}</li>
                    <li>• {t('gettingToParis.byAir.items.2')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('gettingToParis.byTrain.title')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('gettingToParis.byTrain.items.0')}</li>
                    <li>• {t('gettingToParis.byTrain.items.1')}</li>
                    <li>• {t('gettingToParis.byTrain.items.2')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Local Transportation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {t('localTransportation.title')}
                </CardTitle>
                <CardDescription>
                  {t('localTransportation.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('localTransportation.metro.title')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('localTransportation.metro.items.0')}</li>
                    <li>• {t('localTransportation.metro.items.1')}</li>
                    <li>• {t('localTransportation.metro.items.2')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('localTransportation.other.title')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('localTransportation.other.items.0')}</li>
                    <li>• {t('localTransportation.other.items.1')}</li>
                    <li>• {t('localTransportation.other.items.2')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Weather & Climate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  {t('weather.title')}
                </CardTitle>
                <CardDescription>
                  {t('weather.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('weather.conference.title')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('weather.conference.items.0')}</li>
                    <li>• {t('weather.conference.items.1')}</li>
                    <li>• {t('weather.conference.items.2')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('weather.whatToPack.title')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('weather.whatToPack.items.0')}</li>
                    <li>• {t('weather.whatToPack.items.1')}</li>
                    <li>• {t('weather.whatToPack.items.2')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {t('emergency.title')}
                </CardTitle>
                <CardDescription>
                  {t('emergency.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('emergency.numbers.title')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('emergency.numbers.items.0')}</li>
                    <li>• {t('emergency.numbers.items.1')}</li>
                    <li>• {t('emergency.numbers.items.2')}</li>
                    <li>• {t('emergency.numbers.items.3')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('emergency.useful.title')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('emergency.useful.items.0')}</li>
                    <li>• {t('emergency.useful.items.1')}</li>
                    <li>• {t('emergency.useful.items.2')}</li>
                    <li>• {t('emergency.useful.items.3')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default TravelInformation;