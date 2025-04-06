
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import frTranslation from './locales/fr.json';
import itTranslation from './locales/it.json';
import ptTranslation from './locales/pt.json';
import deTranslation from './locales/de.json';
import ukTranslation from './locales/uk.json';
import koTranslation from './locales/ko.json';

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  fr: {
    translation: frTranslation
  },
  it: {
    translation: itTranslation
  },
  pt: {
    translation: ptTranslation
  },
  de: {
    translation: deTranslation
  },
  uk: {
    translation: ukTranslation
  },
  ko: {
    translation: koTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
