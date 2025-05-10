
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations directly
// English translations
import enCommon from './locales/en/common.json';
import enNav from './locales/en/nav.json';
import enHero from './locales/en/hero.json';
import enAbout from './locales/en/about.json';
import enSpeakers from './locales/en/speakers.json';
import enSchedule from './locales/en/schedule.json';
import enVenue from './locales/en/venue.json';
import enRegister from './locales/en/register.json';
import enFooter from './locales/en/footer.json';
import enVisa from './locales/en/visa.json';
import enFaq from './locales/en/faq.json';
import enRegistration from './locales/en/registration.json';

// Spanish translations
import esCommon from './locales/es/common.json';
import esNav from './locales/es/nav.json';
import esHero from './locales/es/hero.json';
import esAbout from './locales/es/about.json';
import esSpeakers from './locales/es/speakers.json';
import esSchedule from './locales/es/schedule.json';
import esVenue from './locales/es/venue.json';
import esRegister from './locales/es/register.json';
import esFooter from './locales/es/footer.json';
import esVisa from './locales/es/visa.json';
import esFaq from './locales/es/faq.json';
import esRegistration from './locales/es/registration.json';

// French translations
import frCommon from './locales/fr/common.json';
import frNav from './locales/fr/nav.json';
import frHero from './locales/fr/hero.json';
import frAbout from './locales/fr/about.json';
import frSpeakers from './locales/fr/speakers.json';
import frSchedule from './locales/fr/schedule.json';
import frVenue from './locales/fr/venue.json';
import frRegister from './locales/fr/register.json';
import frFooter from './locales/fr/footer.json';
import frVisa from './locales/fr/visa.json';
import frFaq from './locales/fr/faq.json';
import frRegistration from './locales/fr/registration.json';

// Italian translations
import itAbout from './locales/it/about.json';

// Portuguese translations
import ptAbout from './locales/pt/about.json';

// Korean translations
import koAbout from './locales/ko/about.json';

// Ukrainian translations
import ukAbout from './locales/uk/about.json';

// German translations (add empty placeholder to prevent errors)
const deCommon = { languageName: "Deutsch" };

// Define all namespaces we use in the application
const namespaces = ['common', 'nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'];

// Create empty objects for missing translations to prevent errors
const createEmptyTranslations = () => {
  const empty = {};
  return namespaces.reduce((acc, ns) => {
    acc[ns] = ns === 'common' ? { languageName: "Unknown" } : {};
    return acc;
  }, {});
};

// Define resources including all imported translations
const resources = {
  en: {
    common: enCommon,
    nav: enNav,
    hero: enHero,
    about: enAbout,
    speakers: enSpeakers,
    schedule: enSchedule,
    venue: enVenue,
    register: enRegister,
    footer: enFooter,
    visa: enVisa,
    faq: enFaq,
    registration: enRegistration
  },
  es: {
    common: esCommon,
    nav: esNav,
    hero: esHero,
    about: esAbout,
    speakers: esSpeakers,
    schedule: esSchedule,
    venue: esVenue,
    register: esRegister,
    footer: esFooter,
    visa: esVisa,
    faq: esFaq,
    registration: esRegistration
  },
  fr: {
    common: frCommon,
    nav: frNav,
    hero: frHero,
    about: frAbout,
    speakers: frSpeakers,
    schedule: frSchedule,
    venue: frVenue,
    register: frRegister,
    footer: frFooter,
    visa: frVisa,
    faq: frFaq,
    registration: frRegistration
  },
  it: {
    common: { languageName: "Italiano" },
    about: itAbout,
    // Add empty objects for the missing namespaces to prevent errors
    nav: {},
    hero: {},
    speakers: {},
    schedule: {},
    venue: {},
    register: {},
    footer: {},
    visa: {},
    faq: {},
    registration: {}
  },
  pt: {
    common: { languageName: "Português" },
    about: ptAbout,
    // Add empty objects for the missing namespaces to prevent errors
    nav: {},
    hero: {},
    speakers: {},
    schedule: {},
    venue: {},
    register: {},
    footer: {},
    visa: {},
    faq: {},
    registration: {}
  },
  ko: {
    common: { languageName: "한국어" },
    about: koAbout,
    // Add empty objects for the missing namespaces to prevent errors
    nav: {},
    hero: {},
    speakers: {},
    schedule: {},
    venue: {},
    register: {},
    footer: {},
    visa: {},
    faq: {},
    registration: {}
  },
  uk: {
    common: { languageName: "Українська" },
    about: ukAbout,
    // Add empty objects for the missing namespaces to prevent errors
    nav: {},
    hero: {},
    speakers: {},
    schedule: {},
    venue: {},
    register: {},
    footer: {},
    visa: {},
    faq: {},
    registration: {}
  },
  de: {
    common: deCommon,
    ...createEmptyTranslations()
  }
};

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
