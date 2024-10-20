import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';  
import { deleteCard, activateCard, updateCard } from '../../redux/cardsSlice';
import './CardInfoPage.css';

function CardInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();  
  const dispatch = useDispatch();

  const card = useSelector(state =>
    state.cards.find(card => card.id === parseInt(id))
  );

  const [editableCard, setEditableCard] = useState({
    cardholder: card.cardholder,
    cardNumber: card.cardNumber,
    vendor: card.vendor,
    expireMonth: card.expireMonth,
    expireYear: card.expireYear,
    ccv: card.ccv,
  });

  
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

  if (!card) {
    return <p>Card not found!</p>;
  }

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
    navigate('/');
  };

  const handleActivate = () => {
    dispatch(activateCard(card.id));  
  };

  const handleChange = (e) => {
    setEditableCard({
      ...editableCard,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(updateCard({ id: card.id, data: editableCard }));
    navigate('/');
  };

  return (
    <div className="card-info-container">
      <h1>Card details</h1>
      <div className={`card-info ${getCardClass(card.vendor)}`}>
        {card.isActive ? (
          <div>
            <p><strong>cardholder:</strong> {card.cardholder}</p>
            <p><strong>Card issuer:</strong> {card.vendor}</p>
            <p><strong> Card number:</strong> {card.cardNumber}</p>
            <p><strong>Expiration date:</strong> {card.expireMonth}/{card.expireYear}</p>
            <p><strong>CCV:</strong> {card.ccv}</p>
            <p><strong>Status:</strong> Aktivt</p>
            <p>This card is active and cannot be edited or deleted.</p>
          </div>
        ) : (
          <div>
            <div>
              <label>cardholder:</label>
              <input
                type="text"
                name="cardholder"
                value={editableCard.cardholder}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Card number:</label>
              <input
                type="text"
                name="cardNumber"
                value={editableCard.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Card issuer:</label>
              <select
                name="vendor"
                value={editableCard.vendor}
                onChange={handleChange}
              >
                <option value="Mastercard">Mastercard</option>
                <option value="Visa">Visa</option>
                <option value="American Express">American Express</option>
              </select>
            </div>
            <div>
              <label>Expiration month:</label>
              <select
                name="expireMonth"
                value={editableCard.expireMonth}
                onChange={handleChange}
              >
                {[...Array(12).keys()].map((month) => (
                  <option key={month + 1} value={month + 1}>
                    {month + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Expiration year:</label>
              <select
                name="expireYear"
                value={editableCard.expireYear}
                onChange={handleChange}
              >
                {[...Array(10).keys()].map((year) => (
                  <option key={year + new Date().getFullYear()} value={year + new Date().getFullYear()}>
                    {year + new Date().getFullYear()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>CCV:</label>
              <input
                type="text"
                name="ccv"
                value={editableCard.ccv}
                onChange={handleChange}
              />
            </div>
            <div className="button-group">
              <button onClick={handleSave}>Save changes</button>
              <button onClick={handleActivate}>Activate card</button>
            </div>
            <button onClick={handleDelete}>Delete card</button>
          </div>
        )}
      </div>
      
      
      <button className="home-button" onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default CardInfoPage;