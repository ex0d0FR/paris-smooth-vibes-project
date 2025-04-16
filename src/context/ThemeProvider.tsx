
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light"; // Added resolved theme for actual applied theme
  isDark: boolean; // Convenience boolean for components
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

// Validate theme value to ensure it's one of the allowed types
const isValidTheme = (theme: string): theme is Theme => {
  return ["dark", "light", "system"].includes(theme);
};

// Get system theme preference
const getSystemTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "light"; // SSR fallback
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  // Initialize with defaultTheme, but prefer localStorage if available
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    
    const storedTheme = localStorage.getItem("theme");
    return isValidTheme(storedTheme || "") ? (storedTheme as Theme) : defaultTheme;
  });

  // Track the resolved theme (what's actually applied - dark or light)
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(
    theme === "system" ? getSystemTheme() : (theme as "dark" | "light")
  );

  // Effect to update theme when system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        const newResolvedTheme = getSystemTheme();
        setResolvedTheme(newResolvedTheme);
        updateDocumentClass(newResolvedTheme);
      }
    };
    
    // Initial check
    handleChange();
    
    // Listen for system theme changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  // Function to update document class
  const updateDocumentClass = (resolvedTheme: "dark" | "light") => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  };

  // Effect to update DOM and localStorage when theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Persist to localStorage
    localStorage.setItem("theme", theme);
    
    // Update the resolved theme
    const newResolvedTheme = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(newResolvedTheme);
    
    // Update document class
    updateDocumentClass(newResolvedTheme);
  }, [theme]);

  // Provide setTheme function that validates input
  const setTheme = (newTheme: Theme) => {
    if (isValidTheme(newTheme)) {
      setThemeState(newTheme);
    } else {
      console.warn(`Invalid theme specified: ${newTheme}. Using 'system' instead.`);
      setThemeState("system");
    }
  };

  const value = {
    theme,
    setTheme,
    resolvedTheme,
    isDark: resolvedTheme === "dark"
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
