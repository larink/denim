import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="nav header__nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/" className="main-link nav__link nav__link--current">
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/shop" className="main-link nav__link">
            Shop
          </Link>
        </li>
      </ul>
      <button className="nav__close btn-reset">close</button>
    </nav>
  )
}

export default Navbar
