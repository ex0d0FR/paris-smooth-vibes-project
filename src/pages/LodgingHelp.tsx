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
  const [selectedOption, setSelectedOption] = useState('');
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
    if (!selectedOption) {
      toast.error(t('booking.form.selectOption'));
      return;
    }
    if (!formData.name || !formData.email) {
      toast.error(t('booking.form.fillRequired'));
      return;
    }
    
    toast.success(t('booking.form.success'));
    
    // Reset form
    setSelectedOption('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
  };

  const services = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t('services.location.title'),
      description: t('services.location.description'),
      details: t('services.location.details', { returnObjects: true }) as string[]
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t('services.booking.title'), 
      description: t('services.booking.description'),
      details: t('services.booking.details', { returnObjects: true }) as string[]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('services.group.title'),
      description: t('services.group.description'),
      details: t('services.group.details', { returnObjects: true }) as string[]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t('services.lastMinute.title'),
      description: t('services.lastMinute.description'),
      details: t('services.lastMinute.details', { returnObjects: true }) as string[]
    }
  ];

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

            {/* Accommodation Booking Form */}
            <div className="bg-card rounded-lg border p-8 mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t('booking.title')}
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {t('booking.description')}
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Option 1: Conference Venue */}
                    <Card className={`cursor-pointer transition-all ${selectedOption === 'venue' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="venue" id="venue" />
                                <Label htmlFor="venue" className="cursor-pointer">
                                   <CardTitle className="text-xl">{t('booking.venue.title')}</CardTitle>
                                </Label>
                              </div>
                            </div>
                            <CardDescription className="text-base mb-3">
                              {t('booking.venue.description')}
                            </CardDescription>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                {t('booking.venue.features.walking')}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                {t('booking.venue.features.noCommute')}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                {t('booking.venue.features.basic')}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-2xl font-bold text-primary">
                              <Euro className="h-6 w-6 mr-1" />
                              220
                            </div>
                            <div className="text-sm text-muted-foreground">{t('booking.venue.price')}</div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Option 2: Church */}
                    <Card className={`cursor-pointer transition-all ${selectedOption === 'church' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="church" id="church" />
                                <Label htmlFor="church" className="cursor-pointer">
                                   <CardTitle className="text-xl">{t('booking.church.title')}</CardTitle>
                                </Label>
                              </div>
                            </div>
                            <CardDescription className="text-base mb-3">
                              {t('booking.church.description')}
                            </CardDescription>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                {t('booking.church.features.free')}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                {t('booking.church.features.community')}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-2 text-amber-600" />
                                {t('booking.church.features.commute')}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              FREE
                            </div>
                            <div className="text-sm text-muted-foreground">{t('booking.church.price')}</div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </RadioGroup>

                {/* Contact Information Form */}
                {selectedOption && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                          {t('booking.form.fullNameRequired')}
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder={t('booking.form.namePlaceholder')}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                          {t('booking.form.emailAddressRequired')}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder={t('booking.form.emailPlaceholder')}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                        {t('booking.form.phoneNumber')}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder={t('booking.form.phonePlaceholder')}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="special-requests" className="text-sm font-medium mb-2 block">
                        {t('booking.form.specialRequests')}
                      </Label>
                      <Textarea
                        id="special-requests"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                        placeholder={t('booking.form.specialPlaceholder')}
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex justify-center">
                      <Button type="submit" className="px-8 py-3 text-lg">
                        {t('booking.form.submit')}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
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

            {/* FAQ Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                {t('faq.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('faq.q1.question')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t('faq.q1.answer')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('faq.q2.question')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t('faq.q2.answer')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('faq.q3.question')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t('faq.q3.answer')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('faq.q4.question')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t('faq.q4.answer')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Language Support Section */}
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardHeader className="text-center">
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">🌐</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-primary">
                     {t('languageSupport.title')}
                   </CardTitle>
                 </div>
               </CardHeader>
               <CardContent className="text-center space-y-4">
                 <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                   {t('languageSupport.notice')}
                 </p>
                 <p className="text-sm text-muted-foreground">
                   {t('languageSupport.contact')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LodgingHelp;