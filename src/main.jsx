import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import Home from './pages/Home.jsx';
import MarketNews from './pages/MarketNews.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market-news" element={<MarketNews />} />
      </Routes>
    </Router>
    
  </StrictMode>
);
