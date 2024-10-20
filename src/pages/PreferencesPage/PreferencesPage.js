import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/themeSlice';
import './PreferencesPage.css';  
import { Link } from 'react-router-dom';
import { deleteInactiveCards } from '../../redux/cardsSlice';  


function PreferencesPage() {  
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);

  const handleThemeChange = (event) => {
    dispatch(setTheme(event.target.value));
  };
  const handleDeleteInactive = () => {
        
        dispatch(deleteInactiveCards());
       };

  return (
    <div className="preferences-container"> 
      <h1>Theme</h1>
     
      
      <div className="theme-selection">
        <label>Choose a theme:</label>
        <select value={currentTheme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="green">Light Green</option>
        </select>
        
      </div>
      <Link to="/">
        <button className="home-button">Home</button>
      </Link>

      <button className="delete-inactive-button" onClick={handleDeleteInactive}>
       Delete all inactive cards
      </button>
    </div>
  );
}

export default PreferencesPage;