import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchItems } from '../redux/actions/products'
import Product from './Product'

function Products() {
  const dispatch = useDispatch()
  const products = useSelector(({ products }) => products.items)

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <section className="main-products">
      <h2 className="visually-hidden">Products Zonex</h2>
      <div className="container main-products__container">
        <ul className="main-products__list products-grid">
          {products ? (
            products.map((product) => (
              <Product
                key={product.index}
                imageURL={product.imageUrl}
                _id={product._id}
                name={product.name}
                oldPrice={product.oldPrice}
                price={product.price}
              />
            ))
          ) : (
            <li>Загрузка...</li>
          )}
        </ul>
        <div className="main-products__btn-center">
          <button className="btn-reset main-products__more">
            <span>Load more</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 12 21">
              <g>
                <g>
                  <path d="M.09 14.632a.995.995 0 0 1 .922-.618h3.986V1.011a.998.998 0 0 1 1.993 0v13.003h3.987a1.002 1.002 0 0 1 .705 1.708l-4.984 5.003a.994.994 0 0 1-1.409 0L.307 15.722a1.002 1.002 0 0 1-.216-1.09zm3.327 1.383l2.578 2.588 2.577-2.588z" />
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Products
