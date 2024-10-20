import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './redux/cardsSlice'; 
import themeReducer from './redux/themeSlice'; 

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    theme: themeReducer,
  },
});
