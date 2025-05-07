
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

// Wait for i18n to initialize before rendering
if (i18n.isInitialized) {
  renderApp();
} else {
  i18n.on('initialized', renderApp);
  
  // Failsafe - if i18n takes too long
  setTimeout(() => {
    if (!rootElement.hasChildNodes()) {
      console.log("Fallback rendering due to i18n not initializing quickly");
      renderApp();
    }
  }, 1000);
}
