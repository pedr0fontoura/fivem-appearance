import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { EventListener } from './Nui';
import GlobalStyles from './styles/globals';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <EventListener />
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById('root'),
);
