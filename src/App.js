import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddCardPage from './pages/AddCardPage/AddCardPage';
import CardInfoPage from './pages/CardInfoPage/CardInfoPage';
import PreferencesPage from './pages/PreferencesPage/PreferencesPage';
import './index.css';



function App() {
  const currentTheme = useSelector((state) => state.theme.theme);  



  useEffect(() => {
    
    document.body.className = currentTheme;
  }, [currentTheme]);  

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addcard" element={<AddCardPage />} />
        <Route path="/card/:id" element={<CardInfoPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
    </Router>
  );
}

export default App;









