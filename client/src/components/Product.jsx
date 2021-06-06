import React from 'react'
import { Link } from 'react-router-dom'

function Product({ imageUrl, name, descr, _id, type, price, oldPrice, size, order, gender }) {
  return (
    <li className="products-grid__item">
      <article className="product">
        <div className={`product__image ${order ? 'product__image--order' : ''}`}>
          <img src={imageUrl} alt={name} />
        </div>
        <h3 className="product__title">
          <Link to={`/product/${_id}`}>{name}</Link>
        </h3>
        {oldPrice && <span className="product__oldprice">{oldPrice} ₽</span>}
        <span className="product__price">{price} ₽</span>
        {size && <span className="product__size">{size}</span>}
      </article>
    </li>
  )
}

export default Product
