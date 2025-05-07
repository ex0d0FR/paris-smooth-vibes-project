
import { TFunction } from 'i18next';

/**
 * Helper function to ensure translations are properly structured
 * This helps with nested translations and type safety
 */
export const getTranslation = (t: TFunction, namespace: string, key: string) => {
  return t(`${namespace}:${key}`);
};

/**
 * Helper function to dynamically load a namespace
 */
export const loadNamespace = async (i18n: any, namespace: string, callback?: () => void) => {
  try {
    console.log(`Attempting to load namespace: ${namespace}`);
    if (!i18n.hasLoadedNamespace(namespace)) {
      console.log(`Namespace ${namespace} not loaded, loading now...`);
      await i18n.loadNamespaces(namespace);
      console.log(`Namespace ${namespace} loaded successfully`);
    } else {
      console.log(`Namespace ${namespace} already loaded`);
    }
    if (callback) callback();
  } catch (error) {
    console.error(`Error loading namespace ${namespace}:`, error);
  }
};

/**
 * Helper function to ensure all required namespaces are loaded
 */
export const ensureNamespacesLoaded = async (i18n: any, namespaces: string[]) => {
  console.log(`Ensuring namespaces are loaded:`, namespaces);
  try {
    await i18n.loadNamespaces(namespaces);
    console.log('All required namespaces loaded:', i18n.reportNamespaces?.getUsedNamespaces());
    return true;
  } catch (error) {
    console.error('Error loading namespaces:', error);
    return false;
  }
};
