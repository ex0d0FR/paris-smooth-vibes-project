import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Globe } from 'lucide-react';

const TravelInformation = () => {
  return (
    <>
      <Helmet>
        <title>Travel Information - Paris 2025</title>
        <meta name="description" content="Essential travel information for visitors to Paris 2025 conference" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Travel Information
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know for your trip to Paris
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Getting to Paris */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Getting to Paris
                </CardTitle>
                <CardDescription>
                  Transportation options to reach the city
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">By Air</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Charles de Gaulle Airport (CDG) - Main international airport</li>
                    <li>• Orly Airport (ORY) - Secondary international airport</li>
                    <li>• Direct flights from major cities worldwide</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">By Train</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Eurostar from London (3.5 hours)</li>
                    <li>• High-speed trains from major European cities</li>
                    <li>• Gare du Nord, Gare de l'Est main stations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Local Transportation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Local Transportation
                </CardTitle>
                <CardDescription>
                  Getting around in Paris
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Metro & RER</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Extensive metro network covering the city</li>
                    <li>• RER trains for longer distances</li>
                    <li>• Purchase Navigo weekly passes for convenience</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Other Options</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Vélib' bike sharing system</li>
                    <li>• Taxis and ride-sharing services</li>
                    <li>• Walking - many attractions are close together</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Weather & Climate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Weather & Climate
                </CardTitle>
                <CardDescription>
                  What to expect during your visit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Conference Period</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Average temperature: 15-20°C (59-68°F)</li>
                    <li>• Occasional rainfall - bring an umbrella</li>
                    <li>• Comfortable walking weather</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What to Pack</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Layers for changing temperatures</li>
                    <li>• Comfortable walking shoes</li>
                    <li>• Light rain jacket or umbrella</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Emergency Information
                </CardTitle>
                <CardDescription>
                  Important contacts and services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Emergency Numbers</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Emergency Services: 112</li>
                    <li>• Police: 17</li>
                    <li>• Fire Department: 18</li>
                    <li>• Medical Emergency: 15</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Useful Information</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Currency: Euro (EUR)</li>
                    <li>• Language: French (English widely spoken)</li>
                    <li>• Time Zone: CET (UTC+1)</li>
                    <li>• Electrical outlets: Type C & E (220V)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelInformation;