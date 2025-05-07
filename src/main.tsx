
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import i18n from './i18n';

// Create root element
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Function to render app
const renderApp = () => {
  root.render(<App />);
};

// Initialize and render
// i18n is already initialized in the i18n.ts file
// and doesn't have a ready property, so we'll just render the app
console.log("Initializing app with i18n");
renderApp();

// Add a listener for when i18n has loaded
i18n.on('initialized', () => {
  console.log("i18n initialized successfully");
});

i18n.on('languageChanged', (lng) => {
  console.log("Language changed to:", lng);
});

