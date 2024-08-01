import React from 'react';
import ReactDOM from 'react-dom/client';
import { FournisseurUtilisateur } from './contexts/contexteUtilisateur.jsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <FournisseurUtilisateur>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FournisseurUtilisateur>,
)
