import { createSlice } from '@reduxjs/toolkit';

const initialCards = JSON.parse(localStorage.getItem('cards')) || [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialCards,
  reducers: {
    addCard: (state, action) => {
      if (state.length < 4) {  
        state.push(action.payload);
        localStorage.setItem('cards', JSON.stringify(state)); 
      } else {
        alert('Du kan bara registrera upp till 4 kort.');  
      }
    },
    deleteCard: (state, action) => {
      const updatedCards = state.filter(card => card.id !== action.payload);
      localStorage.setItem('cards', JSON.stringify(updatedCards));  
      return updatedCards;
    },
    activateCard: (state, action) => {
      const updatedCards = state.map(card =>
        card.id === action.payload ? { ...card, isActive: true } : { ...card, isActive: false }
      );
      localStorage.setItem('cards', JSON.stringify(updatedCards));  
      return updatedCards;
    },
    updateCard: (state, action) => {
      const updatedCards = state.map(card =>
        card.id === action.payload.id ? { ...card, ...action.payload.data } : card
      );
      localStorage.setItem('cards', JSON.stringify(updatedCards));  
      return updatedCards;
    },
    deleteInactiveCards: (state) => {
      const activeCards = state.filter(card => card.isActive);  
      localStorage.setItem('cards', JSON.stringify(activeCards));  
      return activeCards;
    }
  },
});

export const { addCard, deleteCard, activateCard, updateCard, deleteInactiveCards } = cardsSlice.actions;
export default cardsSlice.reducer;

