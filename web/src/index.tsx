import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Nui, { EventListener } from './Nui';

if (!import.meta.env.PROD) {
  window.Nui = Nui;
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
    <EventListener />
  </React.StrictMode>,
);
