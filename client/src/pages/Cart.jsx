import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { getCartItems, onSuccessBuy } from '../redux/actions/cart';
import Paypal from '../utils/Paypal';
import Checkout from '../components/Checkout';

function Cart() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, cartDetail } = useSelector(({ auth }) => auth);

  const [cartText, setCartText] = useState('Ваша корзина пуста');
  const [Total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);

  useEffect(() => {
    let cartItems = [];
    if (user && user.cartItems) {
      if (user.cartItems.length > 0) {
        user.cartItems.forEach((item) => {
          cartItems.push(item._id);
        });
        dispatch(getCartItems(cartItems, user.cartItems));
        setTotalQuantity(user.cartItems.length);
      }
    }
  }, [user && user.cartItems]);

  const calculateTotal = () => {
    let total = 0;

    cartDetail &&
      cartDetail.map((item) => {
        total += parseInt(item.price, 10) * item.quantity;
      });

    setTotal(total);
    setShowTotal(true);
  };

  const showCreditHandle = () => {
    setShowCreditModal(!showCreditModal);
  };

  useEffect(() => {
    calculateTotal();
  }, [cartDetail]);

  const transactionSuccess = (data) => {
    dispatch(
      onSuccessBuy({
        cartDetail: cartDetail,
        paymentData: data,
        user: user,
      })
    );
    setCartText('Покупка успешно совершена');
  };

  const transactionError = () => {
    console.log('Paypal error');
  };
  const transactionCancel = () => {
    console.log('Transaction canceled');
  };

  return (
    <div className="container">
      <div className="cart__top cart-top">
        <Link to="/" className="cart-top__link logo">
          Denim
        </Link>
        <Link to="/" className="cart-top__link cart-top__link--go-back">
          <svg
            version="1.1"
            x="0px"
            y="0px"
            width="357px"
            height="357px"
            viewBox="0 0 357 357"
          >
            <g id="close">
              <polygon
                points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 
				214.2,178.5"
              />
            </g>
          </svg>
        </Link>
      </div>
      <div className="cart-wrapper">
        <ul className="cart-items">
          {cartDetail && cartDetail.length === 0 ? (
            <p className="cart-text">{cartText}</p>
          ) : isAuthenticated && cartDetail ? (
            cartDetail.map((item) => (
              <CartItem key={item._id} {...item} user={user} />
            ))
          ) : ShowSuccess ? (
            <p>Покупка совершена успешно</p>
          ) : !isAuthenticated ? (
            <li>
              <p>Ваша корзина пуста</p>
              <p>
                Войдите в свою учетную запись, чтобы увидеть товары, добавленные
                в корзину
              </p>
              <Link className="cart__link-to-logon btn-reset" to="/logon">
                Войти
              </Link>
            </li>
          ) : (
            <p>Ваша корзина пуста</p>
          )}
        </ul>
        {user !== null && !user.address ? (
          <div className="cart__no-user">
            <p>Сначала укажите адрес доставки</p>
            <Link to="/profile" className="cart__link">
              Перейти
            </Link>
          </div>
        ) : isAuthenticated && cartDetail ? (
          <div className="cart-pay">
            <p>Всего {Total} руб.</p>
            <div>
              <button
                className="cart-pay__btn btn-reset"
                onClick={showCreditHandle}
              >
                кредитная карта
              </button>
            </div>
            {showCreditModal && (
              <Checkout
                total={Total}
                showCreditHandle={showCreditHandle}
                setCartText={setCartText}
              />
            )}
            <span className="cart-pay__span">Или</span>
            <div>
              <Paypal
                toPay={Total}
                onSuccess={transactionSuccess}
                transactionError={transactionError}
                transactionCancel={transactionCancel}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Cart;
