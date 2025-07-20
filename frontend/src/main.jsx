// src/main.jsx or src/index.js
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Your actual Google OAuth Client ID
const clientId = "434642760888-vpkmml8fv6801pol73ncngjc63082gk7.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);

