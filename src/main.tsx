
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
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-paris-blue mx-auto mb-4"></div>
          <p className="text-paris-blue">Loading translations...</p>
        </div>
      </div>
    }>
      <App />
    </Suspense>
  </StrictMode>
);
