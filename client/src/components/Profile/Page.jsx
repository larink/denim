import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getOrders } from '../../redux/actions/auth'
import AddressEdit from '../AddressEdit'
import ProfileEdit from '../ProfileEdit'
import Order from './Order'

function Page() {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(({ auth }) => auth)
  const { orders, address } = useSelector(({ auth }) => auth.user || {})
  let history = useHistory()
  let { id } = useParams()

  useEffect(() => {
    if (user) dispatch(getOrders(user._id))
  }, [])

  const setProfilePage = () => {
    if (id === 'account' && !history.location.pathname.includes('account/edit')) {
      return (
        <div className="profile">
          <h1 className="profile__title">Учетная запись</h1>
          <ul className="profile__info profile-info">
            <li className="profile-info__item profile-info__item-name">
              <span>Имя пользователя</span> {user && user.name}
            </li>
            <li className="profile-info__item profile-info__item-email">
              <span>Эл. Почта</span> {user && user.email}
            </li>
          </ul>
          <Link to={`${id}/edit`} className="main-link">
            <span>Изменить</span>
            <svg
              height="492pt"
              viewBox="0 0 492.49284 492"
              width="492pt"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0" />
              <path d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0" />
            </svg>
          </Link>
        </div>
      )
    } else if (id === 'orders') {
      return (
        <>
          <h1 className="profile__title">Заказы</h1>
          <div className="profile__orders profile-orders">
            {orders && orders.length === 0 ? (
              <p>Вы еще не делали заказы</p>
            ) : orders ? (
              orders.map((order, index) => <Order key={order._id} {...order} index={index} />)
            ) : (
              ''
            )}
          </div>
        </>
      )
    } else if (id === 'address' && !history.location.pathname.includes('address/edit')) {
      return (
        <div className="profile__address profile-address">
          <h2 className="profile-address__title">Адрес доставки</h2>
          <div className="profile-address__item">
            <div>
              {address && address.firstName} {address && address.lastName}
            </div>
            <div>{address && address.home}</div>
            <div>{address && address.region}</div>
            <div>{address && address.city}</div>
            <div>{address && address.index}</div>
            <div>{address && address.tel}</div>
          </div>
          <Link to={`${id}/edit`} className="main-link">
            <span>Изменить</span>
            <svg
              height="492pt"
              viewBox="0 0 492.49284 492"
              width="492pt"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0" />
              <path d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0" />
            </svg>
          </Link>
        </div>
      )
    } else if (id === 'address' && history.location.pathname.includes('address/edit')) {
      return <AddressEdit />
    } else if (id === 'account' && history.location.pathname.includes('account/edit')) {
      return <ProfileEdit />
    }
  }

  return <div>{setProfilePage()}</div>
}

export default Page
