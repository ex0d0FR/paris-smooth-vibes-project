
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <LanguageSwitcher />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded-full"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5 text-paris-navy transition-all" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-200 transition-all" />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
