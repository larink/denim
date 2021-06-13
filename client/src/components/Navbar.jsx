import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setGenderState } from '../redux/actions/filters'

function Navbar() {
  const dispatch = useDispatch()

  const getGenderName = (e) => {
    const genderName = e.target.href.split('/')[3].split('-')[0]
    console.log(genderName)
    if (genderName !== 'search') dispatch(setGenderState(genderName))
  }

  return (
    <nav className="nav header__nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/women-home"
            className="main-link nav__link"
            activeClassName="main-link--active"
            onClick={getGenderName}>
            Женщины
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/men-home"
            className="main-link nav__link"
            activeClassName="main-link--active"
            onClick={getGenderName}>
            Мужчины
          </NavLink>
        </li>
      </ul>
      <button className="nav__close btn-reset">close</button>
    </nav>
  )
}

export default Navbar
