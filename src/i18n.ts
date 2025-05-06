
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

// Combine English translations
const enTranslation = {
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
};

// Combine Spanish translations
const esTranslation = {
  common: esCommon,
  nav: esNav,
  hero: esHero,
  about: esAbout
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      es: {
        translation: esTranslation
      },
      fr: {
        translation: {
          about: frAbout
        }
      },
      it: {
        translation: {
          about: itAbout
        }
      },
      pt: {
        translation: {
          about: ptAbout
        }
      },
      ko: {
        translation: {
          about: koAbout
        }
      },
      uk: {
        translation: {
          about: ukAbout
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['common', 'nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'],
    defaultNS: 'common'
  });

export default i18n;
