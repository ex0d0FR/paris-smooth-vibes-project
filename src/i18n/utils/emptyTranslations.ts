
// Create empty objects for missing translations to prevent errors
export const createEmptyTranslations = (namespaces?: string[]) => {
  const allNamespaces = namespaces || ['common', 'nav', 'hero', 'about', 'speakers', 'schedule', 'venue', 'register', 'footer', 'visa', 'faq', 'registration'];
  
  return allNamespaces.reduce((acc, ns) => {
    acc[ns] = ns === 'common' ? { languageName: "Unknown" } : {};
    return acc;
  }, {} as Record<string, any>);
};
