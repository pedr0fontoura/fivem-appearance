import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Nui, { EventListener } from './Nui';

if (process.env.REACT_APP_ENV === 'development') {
  window.Nui = Nui;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <EventListener />
  </React.StrictMode>,
  document.getElementById('root'),
);
