import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useDispatch, useSelector } from 'react-redux';
import { onSuccessBuy } from '../redux/actions/cart';
import { validatePayment } from '../utils/helpers';

function Checkout({ total, showCreditHandle, setCartText }) {
  const dispatch = useDispatch();
  const { cartDetail, user } = useSelector(({ auth }) => auth);

  const [card, setCard] = useState({
    cvc: '',
    name: '',
    number: '',
    expiry: '',
  });

  const changeHandler = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const orderSubmit = (e) => {
    e.preventDefault();

    const data = {
      cvc: card.cvc,
      name: card.name,
      number: card.number,
      expiry: card.expiry,
    };

    const { valid, message } = validatePayment(data);

    if (!valid) {
      alert(message);
      return;
    }

    if (valid) alert('Оплата совершена успешно');

    dispatch(
      onSuccessBuy({
        cartDetail: cartDetail,
        paymentData: data,
        user: user,
      })
    );

    showCreditHandle();
    setCartText('Покупка успешно совершена');
  };

  const orderCanceled = () => {
    setCard({
      cvc: '',
      name: '',
      number: '',
      expiry: '',
    });

    showCreditHandle();
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout">
        <button
          className="checkout__close btn-reset"
          onClick={showCreditHandle}
        >
          <svg
            version="1.1"
            x="0px"
            y="0px"
            width="357px"
            height="357px"
            viewBox="0 0 357 357"
          >
            <g>
              <polygon
                points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 
				214.2,178.5"
              />
            </g>
          </svg>
        </button>
        <div className="checkout__card">
          <Cards
            cvc={card.cvc}
            expiry={card.expiry}
            name={card.name}
            number={card.number}
            focused={'number'}
            callback={(...args) => console.log(args)}
          />
        </div>
        <div className="checkout__bottom">
          <form className="checkout__form checkout-form">
            <label className="checkout-form__label" htmlFor="">
              <span>Номер карты:</span>
              <input
                className="checkout-form__input"
                type="text"
                name="number"
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label className="checkout-form__label" htmlFor="">
              <span>Имя держателя карты:</span>
              <input
                className="checkout-form__input"
                type="text"
                name="name"
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label className="checkout-form__label" htmlFor="">
              <span>cvc-код</span>
              <input
                className="checkout-form__input"
                type="text"
                name="cvc"
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label className="checkout-form__label" htmlFor="">
              <span>Дата окончания действия карты</span>
              <input
                className="checkout-form__input"
                type="date"
                name="expiry"
                onChange={(e) => changeHandler(e)}
              />
            </label>

            <p>Всего {total} руб.</p>

            <div className="checkout-form__btns">
              <button
                className="checkout-form__btn checkout-form__btn--cancel btn-reset"
                onClick={orderCanceled}
              >
                Отменить
              </button>
              <button
                type="submit"
                className="checkout-form__btn checkout-form__btn--pay btn-reset"
                onClick={orderSubmit}
              >
                Оплатить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
