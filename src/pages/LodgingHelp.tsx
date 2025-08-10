import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bed, MapPin, Phone, Mail, Clock, Wifi, Car, Users, Coffee } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LodgingHelp = () => {
  const { t } = useTranslation('accommodations');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location Assistance",
      description: "Get help finding accommodations near the conference venue",
      details: ["Distance from venue", "Transportation options", "Neighborhood guides"]
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Booking Support", 
      description: "Direct assistance with hotel reservations and booking",
      details: ["Group discounts", "Special conference rates", "Booking modifications"]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Group Accommodations",
      description: "Coordinated lodging for teams and large groups",
      details: ["Block reservations", "Adjacent rooms", "Group check-in"]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Last-Minute Help",
      description: "Emergency accommodation assistance",
      details: ["Same-day bookings", "Alternative options", "Cancellation support"]
    }
  ];

  const urgentContacts = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email Support",
      value: "lodging@puentesparis2025.net",
      action: "mailto:lodging@puentesparis2025.net"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone Support",
      value: "+33 1 42 34 56 78",
      action: "tel:+33142345678"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Lodging Options Help - PARIS 2025</title>
        <meta name="description" content="Get assistance with accommodation options for the PARIS 2025 conference. Our lodging support team is here to help you find the perfect place to stay." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <Bed className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  Lodging Options Help
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our dedicated lodging support team is here to help you find the perfect accommodation 
                  for your stay during the PARIS 2025 conference.
                </p>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Need Urgent Assistance?
              </h2>
              <p className="text-muted-foreground mb-4">
                Contact our lodging support team directly for immediate help with accommodation issues.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {urgentContacts.map((contact, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => window.location.href = contact.action}
                  >
                    <div className="flex items-center">
                      {contact.icon}
                      <div className="ml-3 text-left">
                        <div className="font-medium">{contact.label}</div>
                        <div className="text-sm text-muted-foreground">{contact.value}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {services.map((service, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="bg-card rounded-lg border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Additional Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <Bed className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Browse Accommodations</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    View our recommended hotels and accommodations
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/accommodations">View Hotels</Link>
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Travel Information</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Transportation and travel guides
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/travel-information">Travel Guide</Link>
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Local Dining</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Restaurant recommendations near venues
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/restaurants">Find Restaurants</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What if I need to cancel my booking?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our team can help you navigate cancellation policies and find alternative 
                      accommodations if needed. Contact us as soon as possible for assistance.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Are there group discounts available?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Yes! We work with hotels to secure special conference rates and group discounts. 
                      Contact our team for group booking assistance.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How close are the recommended hotels?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      All recommended accommodations are within walking distance or a short metro 
                      ride from the conference venue in Issy-les-Moulineaux.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What amenities should I look for?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Consider WiFi quality, proximity to metro stations, breakfast options, and 
                      business facilities for conference preparation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LodgingHelp;