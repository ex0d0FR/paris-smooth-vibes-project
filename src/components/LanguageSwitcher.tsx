
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Check, Globe } from 'lucide-react';
import { useTheme } from "@/context/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useLanguageSelector from '@/hooks/useLanguageSelector';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const { 
    languages, 
    currentLanguage, 
    open, 
    setOpen, 
    changeLanguage,
    getCurrentLanguageName 
  } = useLanguageSelector();
  
  // Ensure we have the language set correctly on load
  useEffect(() => {
    console.log("LanguageSwitcher component mounted");
    console.log("Current i18n language:", i18n.language);
    console.log("Current selected language:", currentLanguage);
    console.log("Available languages:", languages.map(l => l.code).join(", "));
    
    // Ensure translations are loaded
    const namespaces = ['common', 'nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'];
    i18n.loadNamespaces(namespaces).then(() => {
      console.log("Namespaces loaded in LanguageSwitcher");
      console.log("Loaded namespaces:", i18n.reportNamespaces?.getUsedNamespaces());
    });
    
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage && storedLanguage !== currentLanguage) {
      console.log("Setting language from localStorage:", storedLanguage);
      changeLanguage(storedLanguage.split('-')[0]);
    }
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe 
            className={`h-5 w-5 ${isDark ? 'text-yellow-300' : 'text-paris-navy'}`} 
            strokeWidth={2.5} 
          />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <span>{language.name}</span>
              {currentLanguage === language.code && (
                <Check className="h-4 w-4" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
