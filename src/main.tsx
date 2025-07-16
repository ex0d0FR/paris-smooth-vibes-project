
import { createRoot } from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
import App from './App.tsx';
import './index.css';
import './i18n';

// Create root element
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

console.log("Starting app initialization");

// Render app with loading state
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
