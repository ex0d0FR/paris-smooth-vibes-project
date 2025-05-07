
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations directly
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

// French translations
import frAbout from './locales/fr/about.json';

// Italian translations
import itAbout from './locales/it/about.json';

// Portuguese translations
import ptAbout from './locales/pt/about.json';

// Korean translations
import koAbout from './locales/ko/about.json';

// Ukrainian translations
import ukAbout from './locales/uk/about.json';

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
    about: esAbout
  },
  fr: {
    about: frAbout
  },
  it: {
    about: itAbout
  },
  pt: {
    about: ptAbout
  },
  ko: {
    about: koAbout
  },
  uk: {
    about: ukAbout
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true, // Enable debug to see what's happening
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    defaultNS: 'common',
    ns: ['common', 'nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'],
  });

// Make sure the document lang attribute is set on language change
i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
  console.log("Language changed to:", lng);
});

// Log when i18n is ready
i18n.on('initialized', () => {
  console.log('i18n initialized with languages:', Object.keys(resources));
  console.log('Current language:', i18n.language);
  console.log('Available namespaces:', i18n.options.ns);
});

export default i18n;
