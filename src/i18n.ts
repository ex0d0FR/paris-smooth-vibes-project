
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import English translations as the fallback
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

// Import the entire PT and UK translation files
import ptTranslations from './locales/pt.json';
import ukTranslations from './locales/uk.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,  // Enable debug mode to see what's happening with translations
    resources: {
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
      pt: ptTranslations,  // Use the full PT translations from json file
      ko: {
        about: koAbout
      },
      uk: ukTranslations  // Use the full UK translations from json file
    },
    fallbackLng: 'en',
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

export default i18n;
