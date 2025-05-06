
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n.ts';

// Wait for i18n to initialize before rendering the app
document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
});
