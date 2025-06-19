import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Suspense, useEffect, useState } from 'react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import VisaRequirements from "./pages/VisaRequirements";
import Registration from "./pages/Registration";
import Restaurants from "./pages/Restaurants";
import Accommodations from "./pages/Accommodations";
import { useTranslation } from 'react-i18next';
import './i18n';

const queryClient = new QueryClient();

// Wrapper component to ensure i18n is initialized
const I18nInitializer = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    const handleInitialized = () => {
      console.log("i18n initialized in App component");
      setIsI18nInitialized(true);
    };

    if (i18n.isInitialized) {
      console.log("i18n already initialized when App mounted");
      setIsI18nInitialized(true);
    } else {
      console.log("Waiting for i18n to initialize...");
      i18n.on('initialized', handleInitialized);
    }

    return () => {
      i18n.off('initialized', handleInitialized);
    };
  }, [i18n]);

  if (!isI18nInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-paris-blue mx-auto mb-4"></div>
          <p className="text-paris-blue">Initializing translations...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={
            <div className="flex h-screen items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-paris-blue mx-auto mb-4"></div>
                <p className="text-paris-blue">Loading translations...</p>
              </div>
            </div>
          }>
            <I18nInitializer>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/legal-notice" element={<LegalNotice />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/visa-requirements" element={<VisaRequirements />} />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/accommodations" element={<Accommodations />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </I18nInitializer>
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
