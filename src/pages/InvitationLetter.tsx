import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Send, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { EMAILJS_CONFIG } from '@/config/emailjs';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  organization: z.string().min(2, 'Organization/ministry name is required'),
  language: z.string().min(1, 'Please select a preferred language'),
  purpose: z.string().min(10, 'Please provide details about your purpose'),
  address: z.string().min(10, 'Please provide your complete address'),
  nationality: z.string().min(2, 'Please specify your nationality'),
});

type FormData = z.infer<typeof formSchema>;

const InvitationLetter = () => {
  const { t } = useTranslation('invitationLetter');
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      language: '',
      purpose: '',
      address: '',
      nationality: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // First, save to database via Supabase function
      const { data: result, error } = await supabase.functions.invoke('send-invitation-request', {
        body: data
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to save request to database');
      }

      console.log('Request saved to database:', result);

      // Then send emails via EmailJS
      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        organization: data.organization || 'Not provided',
        language: data.language,
        purpose: data.purpose,
        address: data.address,
        nationality: data.nationality,
        to_email: data.email // Send confirmation to user
      };

      // Send confirmation email to user
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Send notification to admin
      const adminParams = {
        ...templateParams,
        to_email: 'info@puentesparis2025.net'
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        adminParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Emails sent successfully via EmailJS');

      toast({
        title: t('success.title'),
        description: t('success.description'),
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: t('error.title'),
        description: t('error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('title', 'Invitation Letter Request - PARIS 2025')}</title>
        <meta name="description" content={t('description', 'Request an official invitation letter for visa application to attend PARIS 2025 conference')} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-paris-navy to-gray-800">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-6 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backToHome', 'Back to Home')}
              </Button>
              
              <div className="flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-paris-gold mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {t('title', 'Invitation Letter Request')}
                </h1>
              </div>
              
              <p className="text-white/80 text-lg">
                {t('subtitle', 'Request an official invitation letter for visa application purposes')}
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-paris-navy mb-2">
                  {t('formTitle', 'Personal Information')}
                </h2>
                <p className="text-gray-600">
                  {t('formDescription', 'Please fill out all fields to request your invitation letter')}
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.firstName', 'First Name')}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t('placeholders.firstName', 'Enter your first name')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.lastName', 'Last Name')}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t('placeholders.lastName', 'Enter your last name')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.email', 'Email Address')}</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder={t('placeholders.email', 'Enter your email address')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.phone', 'Phone Number')}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t('placeholders.phone', 'Enter your phone number')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.nationality', 'Nationality')}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t('placeholders.nationality', 'Enter your nationality')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.organization', 'Church/Ministry/Organization')}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t('placeholders.organization', 'Enter your organization name')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.language', 'Preferred Letter Language')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('placeholders.language', 'Select preferred language')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="french">Français</SelectItem>
                            <SelectItem value="spanish">Español</SelectItem>
                            <SelectItem value="portuguese">Português</SelectItem>
                            <SelectItem value="german">Deutsch</SelectItem>
                            <SelectItem value="italian">Italiano</SelectItem>
                            <SelectItem value="korean">한국어</SelectItem>
                            <SelectItem value="ukrainian">Українська</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.address', 'Complete Address')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder={t('placeholders.address', 'Enter your complete address including country')}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.purpose', 'Purpose of Visit')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder={t('placeholders.purpose', 'Describe your purpose for attending the conference and how it relates to your ministry/organization')}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      {t('notice.title', 'Important Notice')}
                    </h3>
                    <p className="text-blue-800 text-sm">
                      {t('notice.text', 'Processing time for invitation letters is 5-7 business days. Please submit your request well in advance of your visa application deadline.')}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-paris-gold hover:bg-yellow-500 text-paris-navy font-semibold py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-paris-navy mr-2"></div>
                        {t('submitting', 'Submitting Request...')}
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('submit', 'Submit Request')}
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  {t('contact.text', 'Questions? Contact us at')}{' '}
                  <a href="mailto:info@puentesparis2025.net" className="text-paris-gold hover:underline">
                    info@puentesparis2025.net
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default InvitationLetter;