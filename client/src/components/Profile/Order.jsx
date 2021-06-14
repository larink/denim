import React from 'react';
import Product from '../Product';

function Order({ products, user, data }) {
  console.log(user);

  return (
    <div className="order">
      <h2 className="order__title">
        Заказ номер {products && products[0].dateOfPurchase}
      </h2>
      <div className="order__wrapper">
        <div className="order__descr order-descr">
          <h2 className="order-descr__title">Адрес доставки:</h2>
          {user !== null &&
            user.address &&
            Object.values(user.address).map((val) => <div>{val}</div>)}
        </div>
        <ul className="order__items">
          {products &&
            products.map((product) => (
              <Product {...product} user={user} order={true} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Order;
