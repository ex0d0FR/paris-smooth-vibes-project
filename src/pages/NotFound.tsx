
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { ensureNamespacesLoaded } from '@/utils/i18nUtils';

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Ensure we have the proper translations for the 404 page
    const loadTranslations = async () => {
      try {
        await ensureNamespacesLoaded(i18n, ['common']);
        console.log("NotFound page translations loaded successfully");
      } catch (error) {
        console.error("Failed to load NotFound page translations:", error);
      }
    };
    
    loadTranslations();
    
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname, i18n]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | PARIS2025</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      
      <Navbar />
      
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-16">
          <div className="text-center px-4 max-w-md">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h1 className="text-6xl font-bold mb-4 text-paris-navy dark:text-paris-gold">404</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {t('notFound.message', 'Oops! Page not found')}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                {t('notFound.description', 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.')}
              </p>
              <Button 
                asChild
                className="bg-paris-blue hover:bg-paris-navy text-white dark:bg-paris-gold dark:hover:bg-yellow-500 dark:text-paris-navy px-6 py-3 rounded-lg transition-colors"
              >
                <Link to="/">
                  {t('notFound.returnHome', 'Return to Home')}
                </Link>
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
