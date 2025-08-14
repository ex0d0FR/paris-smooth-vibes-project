import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bed, MapPin, Phone, Mail, Clock, Wifi, Car, Users, Coffee, CheckCircle, Euro } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const LodgingHelp = () => {
  const { t } = useTranslation('lodging');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error(t('booking.form.fillRequired'));
      return;
    }
    
    toast.success(t('booking.form.success'));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
  };

  const urgentContacts = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: t('urgentAssistance.emailLabel'),
      value: "info@puentesparis2025.net",
      action: "mailto:info@puentesparis2025.net"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: t('urgentAssistance.phoneLabel'),
      value: "+33 7 49 44 26 26",
      action: "tel:+33749442626"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('title')} - PARIS 2025</title>
        <meta name="description" content={t('description')} />
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
                {t('backToHome')}
              </Link>
              
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <Bed className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  {t('title')}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('description')}
                </p>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                {t('urgentAssistance.title')}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t('urgentAssistance.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {urgentContacts.map((contact, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-4 flex items-center"
                    onClick={() => window.location.href = contact.action}
                  >
                    {contact.icon}
                    <div className="ml-3 text-left">
                      <div className="font-medium">{contact.label}</div>
                      <div className="text-sm text-muted-foreground">{contact.value}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>


            {/* Church Accommodation Booking */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                {t('booking.title')}
              </h2>
              
              <div className="max-w-2xl mx-auto">
                <Card className="h-full border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Bed className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{t('booking.church.title')}</CardTitle>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">FREE</div>
                        <div className="text-sm text-muted-foreground">{t('booking.church.price')}</div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {t('booking.church.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                        {t('booking.church.features.free')}
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                        {t('booking.church.features.community')}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-orange-500 mr-3" />
                        {t('booking.church.features.commute')}
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">{t('booking.form.fullNameRequired')}</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder={t('booking.form.namePlaceholder')}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t('booking.form.emailAddressRequired')}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t('booking.form.emailPlaceholder')}
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">{t('booking.form.phoneNumber')}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t('booking.form.phonePlaceholder')}
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="special">{t('booking.form.specialRequests')}</Label>
                        <Textarea
                          id="special"
                          placeholder={t('booking.form.specialPlaceholder')}
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        {t('booking.form.submit')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-card rounded-lg border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t('additionalResources.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <Bed className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('additionalResources.browse.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('additionalResources.browse.description')}
                  </p>
                  <Link to="/accommodations">
                    <Button variant="outline">{t('additionalResources.browse.button')}</Button>
                  </Link>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('additionalResources.travel.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('additionalResources.travel.description')}
                  </p>
                  <Link to="/travel-information">
                    <Button variant="outline">{t('additionalResources.travel.button')}</Button>
                  </Link>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('additionalResources.dining.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('additionalResources.dining.description')}
                  </p>
                  <Link to="/restaurants">
                    <Button variant="outline">{t('additionalResources.dining.button')}</Button>
                  </Link>
                </div>
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