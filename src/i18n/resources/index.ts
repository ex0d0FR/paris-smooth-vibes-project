
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
    ...createEmptyTranslations(['nav', 'hero', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'])
  },
  pt: {
    common: { languageName: "Português" },
    about: ptResources.about,
    ...createEmptyTranslations(['nav', 'hero', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'])
  },
  ko: {
    common: { languageName: "한국어" },
    about: koResources.about,
    ...createEmptyTranslations(['nav', 'hero', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'])
  },
  uk: {
    common: { languageName: "Українська" },
    about: ukResources.about,
    ...createEmptyTranslations(['nav', 'hero', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'])
  },
  de: {
    common: { languageName: "Deutsch" },
    ...createEmptyTranslations()
  }
};
