
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
i18n.ready.then(() => {
  console.log("i18n initialized successfully");
  renderApp();
}).catch(error => {
  console.error("Failed to initialize i18n:", error);
  renderApp(); // Render anyway to prevent blank screen
});

// Failsafe - if i18n takes too long
setTimeout(() => {
  if (!rootElement.hasChildNodes()) {
    console.log("Fallback rendering due to i18n not initializing quickly");
    renderApp();
  }
}, 1000);
