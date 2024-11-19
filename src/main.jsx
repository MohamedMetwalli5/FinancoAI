import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import HomePage from './pages/HomePage.jsx';
import MarketNewsPage from './pages/MarketNewsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/market-news" element={<MarketNewsPage />} />
        <Route path="/profile" element={<SettingsPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
