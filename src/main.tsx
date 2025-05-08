
import { createRoot } from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
import App from './App.tsx';
import './index.css';
import i18n from './i18n';

// Create root element
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

console.log("Starting app initialization");
console.log("Current i18n language:", i18n.language);
console.log("Available namespaces:", i18n.options.ns);

// Render app with loading state
root.render(
  <StrictMode>
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading translations...</div>}>
      <App />
    </Suspense>
  </StrictMode>
);

// Add listeners for i18n events after initial render
i18n.on('initialized', () => {
  console.log("i18n initialized event fired!");
});

i18n.on('loaded', () => {
  console.log("i18n resources loaded event fired!");
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`i18n failed loading: ${lng} ${ns}`, msg);
});
