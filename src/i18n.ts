
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

// Combine English translations as the fallback
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

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
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
