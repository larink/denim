import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import Search from './Search'

function Header({ color }) {
  const auth = useSelector(({ auth }) => auth)
  const gender = useSelector(({ app }) => app.gender)
  const { user, isAuthenticated } = auth

  const getNumberOfItems = () => {
    if (isAuthenticated) {
      if (user !== null) {
        if (user.cartItems) {
          return user.cartItems.length
        } else {
          return 0
        }
      }
    } else {
      return 0
    }
  }

  return (
    <header className={`header ${color}`}>
      <div className="container header__container">
        <button className="burger btn-reset header__burger">
          <span className="burger__line"></span>
        </button>
        <Navbar />
        <Link to="/" className="logo header__logo" aria-label="logo">
          Denim
        </Link>
        <ul className="shop-nav header__shop-nav">
          <li className="shop-nav__item">
            <Link
              to={`/${auth.isAuthenticated ? 'profile' : 'logon'}`}
              className="shop-nav__link shop-nav__link--user"
              aria-label="Go to profile">
              <svg
                version="1.1"
                id="Capa_1"
                //  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                //  style="enable-background:new 0 0 512 512;"
                // xml:space="preserve"
              >
                <g>
                  <path
                    d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
                    C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
                    c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
                    h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
                    c59.551,0,108,48.448,108,108S315.551,256,256,256z"
                  />
                </g>
              </svg>
            </Link>
          </li>
          <li className="shop-nav__item">
            <Link to="/cart" className="shop-nav__link cart" aria-label="Go to cart">
              <span className="cart__icon">
                <svg
                  version="1.1"
                  id="Capa_1"
                  // xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 204 204"
                  // style="enable-background:new 0 0 208.955 208.955;"
                  // xml:space="preserve"
                >
                  <path
                    d="M190.85,200.227L178.135,58.626c-0.347-3.867-3.588-6.829-7.47-6.829h-26.221V39.971c0-22.04-17.93-39.971-39.969-39.971
                    C82.437,0,64.509,17.931,64.509,39.971v11.826H38.27c-3.882,0-7.123,2.962-7.47,6.829L18.035,200.784
                    c-0.188,2.098,0.514,4.177,1.935,5.731s3.43,2.439,5.535,2.439h157.926c0.006,0,0.014,0,0.02,0c4.143,0,7.5-3.358,7.5-7.5
                    C190.95,201.037,190.916,200.626,190.85,200.227z M79.509,39.971c0-13.769,11.2-24.971,24.967-24.971
                    c13.768,0,24.969,11.202,24.969,24.971v11.826H79.509V39.971z M33.709,193.955L45.127,66.797h19.382v13.412
                    c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5V66.797h49.936v13.412c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5
                    V66.797h19.364l11.418,127.158H33.709z"
                  />
                </svg>
              </span>
              <span className="cart__quantity quantity">{getNumberOfItems()}</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <ul className="nav__list nav__list--flex">
          <li className="nav__item">
            <Link to={`/${gender}`} className="main-link nav__link">
              Одежда
            </Link>
          </li>
          <li className="shop-nav__item">
            <Search />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
