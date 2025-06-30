
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Building, Mail, Phone, User } from 'lucide-react';

const Sponsors = () => {
  const { t } = useTranslation('sponsors');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Sponsor form submitted');
  };

  return (
    <>
      <Helmet>
        <title>Sponsors - PARIS 2025 Conference</title>
        <meta name="description" content="Become a sponsor of PARIS 2025 and help make this important missionary conference possible." />
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-paris-navy to-paris-blue text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('pageTitle', 'Become a Sponsor')}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                {t('pageSubtitle', 'Partner with us to make PARIS 2025 a transformative experience for church leaders worldwide')}
              </p>
            </div>
          </section>

          {/* Sponsorship Options */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-paris-navy dark:text-white">
                {t('sponsorshipOptions', 'Sponsorship Options')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Building className="w-12 h-12 text-paris-gold mx-auto mb-4" />
                    <CardTitle className="text-paris-navy dark:text-white">
                      {t('venueSponsorship', 'Venue Sponsorship')}
                    </CardTitle>
                    <CardDescription>
                      {t('venueDescription', 'Help cover the costs of the conference venue and facilities')}
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Users className="w-12 h-12 text-paris-gold mx-auto mb-4" />
                    <CardTitle className="text-paris-navy dark:text-white">
                      {t('attendeeSponsorship', 'Attendee Sponsorship')}
                    </CardTitle>
                    <CardDescription>
                      {t('attendeeDescription', 'Sponsor tickets for church leaders who need financial assistance')}
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Heart className="w-12 h-12 text-paris-gold mx-auto mb-4" />
                    <CardTitle className="text-paris-navy dark:text-white">
                      {t('generalSponsorship', 'General Support')}
                    </CardTitle>
                    <CardDescription>
                      {t('generalDescription', 'Support various conference expenses including materials and logistics')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-paris-navy dark:text-white">
                  {t('contactForm', 'Get in Touch')}
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                  {t('formDescription', 'Fill out the form below and we\'ll get back to you with sponsorship details and opportunities.')}
                </p>

                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            <User className="inline w-4 h-4 mr-2" />
                            {t('firstName', 'First Name')} *
                          </label>
                          <Input required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            <User className="inline w-4 h-4 mr-2" />
                            {t('lastName', 'Last Name')} *
                          </label>
                          <Input required />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          <Mail className="inline w-4 h-4 mr-2" />
                          {t('email', 'Email Address')} *
                        </label>
                        <Input type="email" required />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          <Phone className="inline w-4 h-4 mr-2" />
                          {t('phone', 'Phone Number')}
                        </label>
                        <Input type="tel" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          <Building className="inline w-4 h-4 mr-2" />
                          {t('organization', 'Organization/Church')}
                        </label>
                        <Input />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          {t('sponsorshipType', 'Sponsorship Interest')}
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectOption', 'Select an option')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="venue">{t('venueSponsorship', 'Venue Sponsorship')}</SelectItem>
                            <SelectItem value="attendee">{t('attendeeSponsorship', 'Attendee Sponsorship')}</SelectItem>
                            <SelectItem value="general">{t('generalSponsorship', 'General Support')}</SelectItem>
                            <SelectItem value="custom">{t('customSponsorship', 'Custom Sponsorship')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          {t('message', 'Message')}
                        </label>
                        <Textarea 
                          placeholder={t('messagePlaceholder', 'Tell us about your sponsorship interests and any questions you may have...')}
                          rows={4}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-paris-gold hover:bg-paris-gold/90 text-white"
                      >
                        {t('submitForm', 'Send Message')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Sponsors;
