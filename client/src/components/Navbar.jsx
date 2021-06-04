import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setGenderState } from '../redux/actions/filters'

function Navbar() {
  const dispatch = useDispatch()

  const getGenderName = (e) => {
    const genderName = e.target.href.split('/')[3].split('-')[0]
    dispatch(setGenderState(genderName))
  }

  return (
    <nav className="nav header__nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/women-home" className="main-link nav__link" onClick={getGenderName}>
            Женщины
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/men-home" className="main-link nav__link " onClick={getGenderName}>
            Мужчины
          </Link>
        </li>
      </ul>
      <button className="nav__close btn-reset">close</button>
    </nav>
  )
}

export default Navbar
