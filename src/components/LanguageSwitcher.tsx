
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Globe, Loader2 } from 'lucide-react';
import { useTheme } from "@/context/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useLanguageSelector from '@/hooks/useLanguageSelector';

const LanguageSwitcher = () => {
  const { isDark } = useTheme();
  const { 
    languages, 
    currentLanguage, 
    open, 
    setOpen, 
    changeLanguage,
    isLoading
  } = useLanguageSelector();
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {isLoading ? (
            <Loader2 
              className={`h-5 w-5 ${isDark ? 'text-yellow-300' : 'text-paris-navy'} animate-spin`} 
              strokeWidth={2.5} 
            />
          ) : (
            <Globe 
              className={`h-5 w-5 ${isDark ? 'text-yellow-300' : 'text-paris-navy'}`} 
              strokeWidth={2.5} 
            />
          )}
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
