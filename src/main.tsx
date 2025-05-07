
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';
import i18n from './i18n';

// Create root element
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

console.log("Starting app initialization");
console.log("Current i18n language:", i18n.language);
console.log("Available namespaces:", i18n.options.ns);

// Function to render app
const renderApp = () => {
  console.log("Rendering app with language:", i18n.language);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Initialize and render
renderApp();

// Add listeners for i18n events after initial render
i18n.on('initialized', () => {
  console.log("i18n initialized event fired!");
  console.log("i18n language after initialization:", i18n.language);
  console.log("Available namespaces after initialization:", i18n.options.ns);
  console.log("Loaded namespaces:", i18n.reportNamespaces?.getUsedNamespaces());
  
  // Force a re-render to ensure translations are applied
  renderApp();
});

i18n.on('languageChanged', (lng) => {
  console.log("Language changed event fired:", lng);
  // Re-render the app when the language changes
  renderApp();
});
