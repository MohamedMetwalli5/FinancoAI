import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import HomePage from './pages/HomePage.jsx';
import MarketNewsPage from './pages/MarketNewsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import {DataProvider} from '../src/AppContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/market-news" element={<MarketNewsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </DataProvider>
    </Router>
  </StrictMode>
);
