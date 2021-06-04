import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCartItem } from '../redux/actions/cart'

function CartItem({ _id, imageUrl, name, oldPrice, price, quantity, user, size }) {
  const dispatch = useDispatch()

  const removeFromCart = () => {
    dispatch(removeCartItem(_id, user.id))
  }

  return (
    <li className="cart-items__item">
      <article className="product">
        <div className="product__image cart-image">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="product-wrapper">
          <h3 className="product__title">
            <Link to={`/product/${_id}`}>{name}</Link>
          </h3>
          {oldPrice && <span className="product__oldprice">{oldPrice} ₽</span>}
          <span className="product__price">{price} ₽</span>
          <div className="product__size">Размер: {size}</div>
          <div className="product__quantity">Количество: {quantity}</div>
        </div>
        <button className="product__delete btn-reset" onClick={removeFromCart}>
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            width="357px"
            height="357px"
            viewBox="0 0 357 357">
            <g id="close">
              <polygon
                points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 
				214.2,178.5"
              />
            </g>
          </svg>
        </button>
      </article>
    </li>
  )
}

export default CartItem
