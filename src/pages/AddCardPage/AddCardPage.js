import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';  
import { addCard } from '../../redux/cardsSlice';  
import { useNavigate } from 'react-router-dom';
import './AddCardPage.css';

function AddCardPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const cards = useSelector((state) => state.cards);  

  const onSubmit = (data) => {
    if (cards.length < 4) {  
      const newCard = {
        id: Date.now(),  
        cardNumber: data.cardNumber,
        cardholder: data.cardholder,
        vendor: data.vendor,
        expireMonth: data.expireMonth,
        expireYear: data.expireYear,
        ccv: data.ccv,
        isActive: false,  
      };
      dispatch(addCard(newCard)); 
      navigate('/');  
    } else {
      alert('Du kan bara registrera upp till 4 kort.'); 
    }
  };

  return (
    <div className="add-card-container">
      <h1>Lägg till nytt kort</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="add-card-form">
        <div>
          <label>Card number</label>
          <input
            {...register("cardNumber", { 
              required: "Card number is required", 
              minLength: { value: 16, message: "Card number must be exactly 16 digits" }, 
              maxLength: 16 
            })}
            type="text"
          />
          {errors.cardNumber && <p>{errors.cardNumber.message}</p>}
        </div>
        
        <div>
          <label>cardholder</label>
          <input
            {...register("cardholder", { 
              required: "Cardholder's name is required", 
              pattern: { value: /^[A-Za-z\s]+$/, message: "The name may only contain letters" } 
            })}
            type="text"
          />
          {errors.cardholder && <p>{errors.cardholder.message}</p>}
        </div>
        
        <div>
          <label>Card issuer</label>
          <select {...register("vendor", { required: "Card issuer is required" })}>
            <option value="Mastercard">Mastercard</option>
            <option value="Visa">Visa</option>
            <option value="American Express">American Express</option>
          </select>
          {errors.vendor && <p>{errors.vendor.message}</p>}
        </div>

        <div>
          <label>Expiration month</label>
          <select {...register("expireMonth", { required: "Expiration month is required" })}>
            {[...Array(12).keys()].map((month) => (
              <option key={month + 1} value={month + 1}>
                {month + 1}
              </option>
            ))}
          </select>
          {errors.expireMonth && <p>{errors.expireMonth.message}</p>}
        </div>

        <div>
          <label>Expiration year</label>
          <select {...register("expireYear", { required: "Expiration year is required" })}>
            {[...Array(10).keys()].map((year) => (
              <option key={year + new Date().getFullYear()} value={year + new Date().getFullYear()}>
                {year + new Date().getFullYear()}
              </option>
            ))}
          </select>
          {errors.expireYear && <p>{errors.expireYear.message}</p>}
        </div>

        <div>
          <label>CCV</label>
          <input
            {...register("ccv", { 
              required: "CVV is required", 
              minLength: { value: 3, message: "CVV must be exactly 3 digits" }, 
              maxLength: 3 
            })}
            type="text"
          />
          {errors.ccv && <p>{errors.ccv.message}</p>}
        </div>

        <button type="submit">Add card</button>
      </form>
    </div>
  );
}

export default AddCardPage;