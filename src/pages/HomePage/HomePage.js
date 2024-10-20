import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const cards = useSelector((state) => state.cards);

  
  const getCardClass = (vendor) => {
    switch (vendor) {
      case 'Visa':
        return 'visa';
      case 'Mastercard':
        return 'mastercard';
      case 'American Express':
        return 'american-express';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <h1>My Cards</h1>

      
      {cards.length > 0 ? (
        cards.map((card) => (
          <Link to={`/card/${card.id}`} key={card.id} className="card-link">
            <div className={`card ${getCardClass(card.vendor)}`}> 
              <h2>{card.cardholder} - {card.vendor}</h2>
              <p><strong>Card number:</strong> {card.cardNumber}</p>
              <p><strong>Status:</strong> {card.isActive ? 'Active' : 'Inactive'}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No cards added</p>
      )}

     
      <Link to="/addcard" className="add-card-button">Add new card</Link>

      <Link to="/preferences">
        <button className="preferences-button">Setting</button>
      </Link>
    </div>
  );
}

export default HomePage;
