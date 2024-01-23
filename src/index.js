import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

window.onload = function() {
  let output = document.querySelector("#output");
  const root = createRoot(output);
  root.render( <App />);
};

