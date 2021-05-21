import React from 'react'
import { Link } from 'react-router-dom'

function Product({ imageUrl, name, descr, _id, type, price, oldPrice }) {
  return (
    <li className="products-grid__item">
      <article className="product">
        <div className="product__image">
          <img src={imageUrl} alt={name} />
        </div>
        <h3 className="product__title">
          <Link to={`/product/${_id}`}>{name}</Link>
        </h3>
        {oldPrice && <span className="product__oldprice">{oldPrice} ₽</span>}
        <span className="product__price">{price} ₽</span>
      </article>
    </li>
  )
}

export default Product
