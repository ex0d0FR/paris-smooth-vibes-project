
import i18n from 'i18next';

// Function to get a translation without having to use the hook
export const getTranslation = (key: string, ns: string = 'common', options = {}) => {
  return i18n.t(key, { ns, ...options });
};

// Function to explicitly load a namespace
export const loadNamespace = async (namespace: string) => {
  try {
    await i18n.loadNamespaces(namespace);
    console.log(`Namespace ${namespace} loaded successfully`);
    return true;
  } catch (error) {
    console.error(`Error loading namespace ${namespace}:`, error);
    return false;
  }
};

// Function to ensure a set of namespaces are loaded
export const ensureNamespacesLoaded = async (i18nInstance: typeof i18n, namespaces: string[]) => {
  console.log(`Ensuring namespaces are loaded: ${namespaces}`);
  try {
    await i18nInstance.loadNamespaces(namespaces);
    const loadedNs = i18nInstance.reportNamespaces?.getUsedNamespaces() || [];
    console.log(`All required namespaces loaded: ${loadedNs}`);
    return true;
  } catch (error) {
    console.error('Failed to load namespaces:', error);
    return false;
  }
};

export default { getTranslation, loadNamespace, ensureNamespacesLoaded };
