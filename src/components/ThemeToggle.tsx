
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";

const ThemeToggle = () => {
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-2">
      <LanguageSwitcher />
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-300 transition-all hover:text-yellow-200" />
        ) : (
          <Moon className="h-5 w-5 text-paris-navy transition-all" />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
