
import i18n from './config';

// Export utilities for using i18n throughout the application
export const changeLang = (lang: string) => {
  return i18n.changeLanguage(lang);
};

export const getCurrentLang = () => {
  return i18n.language;
};

// Re-export everything from config
export default i18n;
