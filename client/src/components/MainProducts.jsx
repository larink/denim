import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchItems, fetchPopularItems } from '../redux/actions/products'
import Product from './Product'

function MainProducts() {
  const dispatch = useDispatch()
  const { items } = useSelector(({ products }) => products)
  const { gender } = useSelector(({ app }) => app)

  useEffect(() => {
    dispatch(fetchPopularItems(gender))
  }, [])

  return (
    <section className="main-products">
      <h2 className="visually-hidden">Products Denim</h2>
      <h2 className="main-products__title">Популярные товары</h2>
      <div className="container main-products__container">
        <ul className="main-products__list products-grid">
          {items ? (
            items.map((product) => <Product key={product._id} {...product} />)
          ) : (
            <li>Загрузка...</li>
          )}
        </ul>
      </div>
    </section>
  )
}

export default MainProducts
