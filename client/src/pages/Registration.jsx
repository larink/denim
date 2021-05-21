import React from 'react'
import { Link } from 'react-router-dom'

function Registration() {
  return (
    <div className="site-container">
      <div className="registration">
        <div className="registration__top">
          <Link to="/" className="logo registration__logo" aria-label="logo">
            Denim
          </Link>
          <Link to="/" className="link registration__link">
            <svg
              version="1.1"
              id="Capa_1"
              // xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="357px"
              height="357px"
              viewBox="0 0 357 357"
              //  style="enable-background:new 0 0 357 357;" x
              //  ml:space="preserve"
            >
              <g id="close">
                <polygon
                  points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 
				214.2,178.5"
                />
              </g>
            </svg>
          </Link>
        </div>
        <div className="wrapper">
          <h2>Регистрация</h2>
          <form className="registration-form registration__form form">
            <label htmlFor="email">
              <span>Эл.Почта</span>
              <input type="email" name="email" className="registration-form__input input" />
            </label>

            <label htmlFor="password">
              <span>Пароль</span>
              <input type="password" name="password" className="registration-form__input input" />
            </label>

            <div className="registration-form__btns">
              <button className="registration-form__btn btn-reset button">Регистрация</button>
              <Link to="/login" className="button">
                Уже зарегестрированы ? Войти
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration
