
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { resources } from './resources';

// Define all namespaces we use in the application
const namespaces = ['common', 'nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'];

console.log("Initializing i18n with resources:", Object.keys(resources));

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true, // Enable debug to see what's happening with translations
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
      console.log("i18n initialized successfully");
      console.log("Current language:", i18n.language);
      console.log("Available namespaces:", i18n.options.ns);
      console.log("Loaded namespaces:", i18n.reportNamespaces?.getUsedNamespaces());
      
      // Force load all namespaces
      i18n.loadNamespaces(namespaces);
    }
  });

// Make sure the document lang attribute is set on language change
i18n.on('languageChanged', (lng) => {
  const simpleLng = lng.split('-')[0]; // Strip region code
  document.documentElement.setAttribute('lang', simpleLng);
  console.log("Language changed to:", simpleLng);
  console.log("Available namespaces:", i18n.options.ns);
  console.log("Used namespaces:", i18n.reportNamespaces?.getUsedNamespaces());
});

// Add additional event listeners for better debugging
i18n.on('initialized', () => {
  console.log("i18n initialized event fired!");
  console.log("Current language:", i18n.language);
});

i18n.on('loaded', (loaded) => {
  console.log("i18n resources loaded event fired!", loaded);
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`i18n failed loading: ${lng} ${ns}`, msg);
});

export default i18n;
