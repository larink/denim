import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getOrders } from '../../redux/actions/auth'
import Order from './Order'

function Page() {
  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.user)
  const orders = useSelector(({ auth }) => auth.user.orders)

  let { id } = useParams()

  useEffect(() => {
    if (user) dispatch(getOrders(user.id))
  }, [])

  const setProfilePage = () => {
    if (id === 'account') {
      return (
        <>
          <h1 className="profile__title">Учетная запись</h1>
          <ul className="profile__info profile-info">
            <li className="profile-info__item profile-info__item-name">
              <span>Имя</span> {user && user.name}
            </li>
            <li className="profile-info__item profile-info__item-email">
              <span>Эл. Почта</span> {user && user.email}
            </li>
            <li className="profile-info__item profile-info__item-password">
              <span>Пароль</span> ********
            </li>
          </ul>
        </>
      )
    } else if (id === 'orders') {
      return (
        <>
          <h1 className="profile__title">Заказы</h1>
          <div className="profile__orders profile-orders">
            {orders.length === 0 ? (
              <p>Вы еще не делали заказы</p>
            ) : orders ? (
              orders.map((order, index) => <Order key={order._id} {...order} index={index} />)
            ) : (
              ''
            )}
          </div>
        </>
      )
    }
  }

  return <div>{setProfilePage()}</div>
}

export default Page
