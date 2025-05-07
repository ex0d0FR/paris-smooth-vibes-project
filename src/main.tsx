
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
console.log("Initializing app with i18n");
renderApp();

// Add a listener for when i18n has loaded
i18n.on('initialized', () => {
  console.log("i18n initialized successfully");
  // Make sure the app re-renders when i18n is ready
  renderApp();
});

i18n.on('languageChanged', (lng) => {
  console.log("Language changed to:", lng);
  // Re-render the app when the language changes
  renderApp();
});
