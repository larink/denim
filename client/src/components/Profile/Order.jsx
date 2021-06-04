import React, { useEffect, useState } from 'react'
import Product from '../Product'

function Order({ products, _id, user, data }) {
  const [orderProducts, setOrderProducts] = useState([])

  useEffect(() => {
    setOrderProducts(products)
  }, [])

  console.log(orderProducts)
  console.log(data)
  console.log(decodeURIComponent(JSON.parse('"http\\u00253A\\u00252F\\u00252Fexample.com"')))
  let str = data.address.line1
  console.log(String.fromCharCode(str.charCodeAt(0)))
  console.log('\u0443\u043B\u0438\u0446\u0430\u041F\u0435\u0440\u0432\u0430\u044F')

  return (
    <div className="order">
      <h2 className="order__title">Заказ номер {_id}</h2>
      <div className="order__descr order-descr">
        <h2 className="order-descr__title">Адрес доставки:</h2>
      </div>
      <ul className="order__items">
        {orderProducts && orderProducts.map((product) => <Product {...product} order={true} />)}
      </ul>
    </div>
  )
}

export default Order
