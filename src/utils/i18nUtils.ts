
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
  if (!i18n.hasLoadedNamespace(namespace)) {
    await i18n.loadNamespaces(namespace);
    if (callback) callback();
  }
};
