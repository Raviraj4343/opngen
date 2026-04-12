import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App.jsx';
import openGenLogo from './logo/opngen_logo.png';
import './styles/theme.css';
import './styles/globals.css';

const setBrandFavicon = () => {
  const existingIcon = document.querySelector("link[rel='icon']");

  if (existingIcon) {
    existingIcon.setAttribute('href', openGenLogo);
    return;
  }

  const iconLink = document.createElement('link');
  iconLink.setAttribute('rel', 'icon');
  iconLink.setAttribute('type', 'image/png');
  iconLink.setAttribute('href', openGenLogo);
  document.head.appendChild(iconLink);
};

setBrandFavicon();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
