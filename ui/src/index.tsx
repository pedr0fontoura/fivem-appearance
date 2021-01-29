import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Nui, { EventListener } from './Nui';

// Expose Nui as a global variable for debugging on the browser;
if (process.env.NODE_ENV === 'development') {
  window.Nui = Nui;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <EventListener />
  </React.StrictMode>,
  document.getElementById('root'),
);
