import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import Logout from '../components/auth/Logout'
import { getOrders } from '../redux/actions/auth'
import Page from '../components/Profile/Page'

function Profile() {
  const user = useSelector(({ auth }) => auth.user)
  let { path, url } = useRouteMatch()

  return (
    <div className="container">
      <div className="profile">
        <div className="profile__top profile-top">
          <div className="profile-menu__first">
            <Link to="/" className="profile-top__link logo">
              Denim
            </Link>
            <Link to="/" className="profile-top__link profile-top__link--go-back">
              <svg version="1.1" x="0px" y="0px" width="357px" height="357px" viewBox="0 0 357 357">
                <g id="close">
                  <polygon
                    points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 
                  214.2,178.5"
                  />
                </g>
              </svg>
            </Link>
          </div>
          <div className="profile-menu__second">
            <ul className="profile-menu__list">
              <li className="profile-menu__item">
                <NavLink
                  to={`${url}/account`}
                  className="profile-menu__link"
                  activeClassName="active">
                  Моя учетная запись
                </NavLink>
              </li>
              <li className="profile-menu__item">
                <NavLink to={`${url}/address`} className="profile-menu__link">
                  Адрес доставки
                </NavLink>
              </li>
              <li className="profile-menu__item">
                <NavLink to={`${url}/orders`} className="profile-menu__link">
                  Мои заказы
                </NavLink>
              </li>
            </ul>
            <Logout />
          </div>
        </div>
        {user !== null && user.role === 'admin' ? (
          <Link to={`/admin`} className="profile-menu__link">
            Админ-панель
          </Link>
        ) : (
          ''
        )}
        <Switch>
          <Route path={`${path}/:id`}>
            <Page />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Profile
