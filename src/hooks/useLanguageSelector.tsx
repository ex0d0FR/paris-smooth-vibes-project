
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'de', name: 'Deutsch' },
  { code: 'uk', name: 'Українська' },
  { code: 'ko', name: '한국어' }
];

export const useLanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [, forceUpdate] = useState({});
  
  const changeLanguage = (lng: string) => {
    console.log("Changing language to:", lng);
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    localStorage.setItem('i18nextLng', lng);
    setOpen(false);
    // Force component re-render
    forceUpdate({});
  };

  const getCurrentLanguageName = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    return currentLang ? currentLang.name : 'English';
  };
  
  useEffect(() => {
    // Set initial language attribute
    document.documentElement.lang = i18n.language;
    
    // Listen for language changes
    const handleLanguageChanged = () => {
      forceUpdate({});
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return { 
    languages, 
    currentLanguage: i18n.language, 
    open,
    setOpen,
    changeLanguage, 
    getCurrentLanguageName 
  };
};

export default useLanguageSelector;
