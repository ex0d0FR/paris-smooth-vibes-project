
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
  const [currentLang, setCurrentLang] = useState<string>('en');
  
  const changeLanguage = (lng: string) => {
    console.log("Attempting to change language to:", lng);
    
    // Normalize language code (strip region)
    const simpleLng = lng.split('-')[0];
    
    // Change language with fallback to English if something goes wrong
    i18n.changeLanguage(simpleLng)
      .then(() => {
        console.log("Language changed successfully to:", simpleLng);
        document.documentElement.lang = simpleLng;
        localStorage.setItem('i18nextLng', simpleLng);
        setCurrentLang(simpleLng);
        setOpen(false);
      })
      .catch(e => {
        console.error("Error changing language:", e);
        // If there's an error, try falling back to English
        if (simpleLng !== 'en') {
          console.log("Falling back to English");
          i18n.changeLanguage('en');
          document.documentElement.lang = 'en';
          localStorage.setItem('i18nextLng', 'en');
          setCurrentLang('en');
          setOpen(false);
        }
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
    // Set initial language 
    const storedLang = localStorage.getItem('i18nextLng') || i18n.language || 'en';
    const detectedLang = storedLang.split('-')[0]; // Strip region code
    
    console.log("Initial language detection:", { 
      storedLang, 
      i18nLanguage: i18n.language, 
      simplifiedLang: detectedLang 
    });
    
    // Only update if necessary
    if (currentLang !== detectedLang) {
      setCurrentLang(detectedLang);
      document.documentElement.lang = detectedLang;
    }
    
    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      console.log("Language changed detected in hook:", lng);
      const simpleLng = lng.split('-')[0];
      setCurrentLang(simpleLng);
      document.documentElement.lang = simpleLng;
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, currentLang]);

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
