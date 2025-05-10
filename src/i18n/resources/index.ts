
import { createEmptyTranslations } from '../utils/emptyTranslations';
import { enResources } from './en';
import { esResources } from './es';
import { frResources } from './fr';
import { itResources } from './it';
import { ptResources } from './pt';
import { koResources } from './ko';
import { ukResources } from './uk';

// Define resources including all imported translations
export const resources = {
  en: enResources,
  es: esResources,
  fr: frResources,
  it: {
    common: { languageName: "Italiano" },
    about: itResources.about,
    footer: { // Add footer translations for Italian
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'hero', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  },
  pt: {
    common: { languageName: "Português" },
    about: ptResources.about,
    footer: { // Add footer translations for Portuguese
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'hero', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  },
  ko: {
    common: { languageName: "한국어" },
    about: koResources.about,
    footer: { // Add footer translations for Korean
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'hero', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  },
  uk: {
    common: { languageName: "Українська" },
    about: ukResources.about,
    footer: { // Add footer translations for Ukrainian
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'hero', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  },
  de: {
    common: { languageName: "Deutsch" },
    footer: { // Add footer translations for German
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  }
};
