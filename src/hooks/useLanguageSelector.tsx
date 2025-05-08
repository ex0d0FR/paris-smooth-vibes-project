
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
  const { i18n, t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language?.split('-')[0] || 'en');
  
  const changeLanguage = (lng: string) => {
    console.log("Attempting to change language to:", lng);
    
    // Force reload namespaces if needed
    const requiredNamespaces = ['common', 'nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'];
    
    i18n.loadNamespaces(requiredNamespaces)
      .then(() => {
        console.log("All namespaces loaded before changing language");
        return i18n.changeLanguage(lng);
      })
      .then(() => {
        console.log("Language changed successfully to:", lng);
        document.documentElement.lang = lng;
        localStorage.setItem('i18nextLng', lng);
        setCurrentLang(lng);
        setOpen(false);
        console.log("Current namespaces loaded:", i18n.reportNamespaces?.getUsedNamespaces());
      })
      .catch(e => {
        console.error("Error changing language:", e);
      });
  };

  const getCurrentLanguageName = () => {
    // First try to get the name from translations
    try {
      const translatedName = t('languageName');
      if (translatedName && translatedName !== 'languageName') {
        return translatedName;
      }
    } catch (e) {
      console.log("Could not get translated language name, falling back to default");
    }
    
    // Fall back to our hardcoded list
    const lang = languages.find(lang => lang.code === currentLang);
    return lang ? lang.name : 'English';
  };
  
  useEffect(() => {
    // Set initial language attribute
    const detectedLang = i18n.language?.split('-')[0] || 'en';
    document.documentElement.lang = detectedLang;
    setCurrentLang(detectedLang);
    
    console.log("useLanguageSelector hook initialized");
    console.log("Current language:", detectedLang);
    console.log("Available namespaces:", i18n.options.ns);
    
    // Load all namespaces on initialization
    const allNamespaces = ['common', 'nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'];
    i18n.loadNamespaces(allNamespaces).then(() => {
      console.log("All namespaces loaded in useLanguageSelector");
      console.log("Loaded namespaces:", i18n.reportNamespaces?.getUsedNamespaces());
    });
    
    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      console.log("Language changed detected in hook:", lng);
      const simpleLng = lng.split('-')[0];
      setCurrentLang(simpleLng);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return { 
    languages, 
    currentLanguage: currentLang, 
    open,
    setOpen,
    changeLanguage, 
    getCurrentLanguageName 
  };
};

export default useLanguageSelector;
