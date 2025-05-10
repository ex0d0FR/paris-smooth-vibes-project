
import { createEmptyTranslations } from '../utils/emptyTranslations';
import { enResources } from './en';
import { esResources } from './es';
import { frResources } from './fr';
import { itResources } from './it';
import { ptResources } from './pt';
import { koResources } from './ko';
import { ukResources } from './uk';

// Import hero JSON files directly
import itHero from '../../locales/it/hero.json';
import ptHero from '../../locales/pt/hero.json';
import koHero from '../../locales/ko/hero.json';
import ukHero from '../../locales/uk/hero.json';
import deHero from '../../locales/de/hero.json';

// Define resources including all imported translations
export const resources = {
  en: enResources,
  es: esResources,
  fr: frResources,
  it: {
    common: { languageName: "Italiano" },
    about: itResources.about,
    hero: itHero,
    footer: { // Add footer translations for Italian
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  },
  pt: {
    common: { languageName: "Português" },
    about: ptResources.about,
    hero: ptHero,
    footer: { // Add footer translations for Portuguese
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  },
  ko: {
    common: { languageName: "한국어" },
    about: koResources.about,
    hero: koHero,
    footer: { // Add footer translations for Korean
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  },
  uk: {
    common: { languageName: "Українська" },
    about: ukResources.about,
    hero: ukHero,
    footer: { // Add footer translations for Ukrainian
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  },
  de: {
    common: { languageName: "Deutsch" },
    hero: deHero,
    footer: { // Add footer translations for German
      ...createEmptyTranslations(['footer']).footer
    },
    ...createEmptyTranslations(['nav', 'about', 'speakers', 'schedule', 'venue', 'register', 'visa', 'faq', 'registration'])
  }
};
