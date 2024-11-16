import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProdiver } from './contexts/contexteUser.jsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProdiver>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProdiver>,
);
