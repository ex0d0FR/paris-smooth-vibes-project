
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import i18n from './i18n';

// Wait for i18n to initialize before rendering the app
i18n.on('initialized', () => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
});

// Failsafe - if i18n is already initialized or takes too long
setTimeout(() => {
  if (!document.getElementById("root")?.hasChildNodes()) {
    console.log("Fallback rendering due to i18n not initializing quickly");
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
  }
}, 1000);
