
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const VisaRequirements = () => {
  const { t, i18n } = useTranslation('visa');
  const location = useLocation();
  
  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);
  
  // Check if notResponsibleFor is an array before mapping
  const notResponsibleFor = t('disclaimer.notResponsibleFor', { returnObjects: true });
  const expenseItems = t('disclaimer.expenses.items', { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{t('title')} | PARIS2025</title>
        <meta name="description" content={`${t('title')} - ${t('subtitle')}`} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:text-paris-blue dark:hover:text-paris-gold">
                {t('nav.home', { ns: 'nav' })}
              </Link> / {t('title')}
            </nav>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-paris-navy dark:text-white">
              {t('title')}
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-6">{t('subtitle')}</h2>
              
              <p className="mb-6">{t('welcome')}</p>
              
              <p className="mb-6">{t('readCarefully')}</p>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500 mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="text-red-500 mr-2">❗</span> 
                  {t('disclaimer.title')}
                </h3>
                <p>{t('disclaimer.intro')}</p>
                <ul className="list-disc list-inside mb-4 mt-2">
                  {Array.isArray(notResponsibleFor) ? notResponsibleFor.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : null}
                </ul>
                <p>{t('disclaimer.expenses.intro')}</p>
                <ul className="list-disc list-inside mt-2">
                  {Array.isArray(expenseItems) ? expenseItems.map((item, index) => (
                    <li key={index}>
                      {index === 0 && <span className="mr-1">✈️</span>}
                      {index === 1 && <span className="mr-1">🍽️</span>}
                      {index === 2 && <span className="mr-1">🛏️</span>}
                      {index === 3 && <span className="mr-1">🏥</span>}
                      {index === 4 && <span className="mr-1">📄</span>}
                      {item}
                    </li>
                  )) : null}
                </ul>
                <p className="mt-4">{t('disclaimer.expenses.conclusion')}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="text-paris-blue dark:text-paris-gold mr-2">🛂</span>
                  {t('visaType.title')}
                </h3>
                <p>{t('visaType.info')}</p>
                <p className="mt-3">{t('visaType.personal')}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="text-paris-blue dark:text-paris-gold mr-2">🧭</span>
                  {t('resources.title')}
                </h3>
                <p>{t('resources.intro')}</p>
                <ul className="list-none mt-3 space-y-2">
                  <li>
                    <a 
                      href="https://www.schengenvisainfo.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-paris-blue dark:text-paris-gold hover:underline"
                    >
                      <span className="mr-2">👉</span> {t('resources.schengenInfo')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://france-visas.gouv.fr/en_US/web/france-visas/"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-paris-blue dark:text-paris-gold hover:underline"
                    >
                      <span className="mr-2">👉</span> {t('resources.franceVisas')}
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <p>{t('conclusion.appreciation')}</p>
                
                <p className="mt-4">{t('conclusion.questions')}</p>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg mt-4">
                  <p className="font-medium">{t('contact.name')}</p>
                  <p className="text-gray-600 dark:text-gray-400">{t('contact.behalf')}</p>
                  <p className="mt-2 flex items-center">
                    <span className="mr-2">📧</span>
                    <a 
                      href={`mailto:${t('contact.email')}`} 
                      className="text-paris-blue dark:text-paris-gold hover:underline"
                    >
                      {t('contact.email')}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VisaRequirements;
