import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { resources } from './resources';

// Define all namespaces we use in the application
const namespaces = ['common', 'nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration', 'accommodations', 'restaurants', 'sponsors'];

// Debug information removed for production security

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false, // Disabled for production security
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    defaultNS: 'common',
    ns: namespaces,
    fallbackNS: 'common',
    load: 'languageOnly', // Strip region code from language (e.g., 'en-US' becomes 'en')
    react: {
      useSuspense: true, // Set this to true so Suspense can handle loading state
      bindI18n: 'languageChanged loaded',
    },
    preload: ['en', 'fr', 'es'], // Preload main languages
  }, (err) => {
    if (err) {
      console.error("i18n initialization error:", err);
    } else {
      // Force load all namespaces
      i18n.loadNamespaces(namespaces).catch(err => {
        console.error("Error loading namespaces:", err);
      });
    }
  });

// Make sure the document lang attribute is set on language change
i18n.on('languageChanged', (lng) => {
  const simpleLng = lng.split('-')[0]; // Strip region code
  document.documentElement.setAttribute('lang', simpleLng);
  
  // Force reload the footer namespace on language change
  i18n.loadNamespaces('footer').catch(err => {
    console.error("Failed to reload footer namespace:", err);
  });
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`i18n failed loading: ${lng} ${ns}`, msg);
});

export default i18n;
