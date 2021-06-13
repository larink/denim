import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__content">
          <div className="footer__top">
            <div className="footer__column">
              <h3 className="footer__title">Обслуживание клиентов</h3>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="tel: +8665972742" className="footer__link">
                    Номер телефона: +866.597.2742
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Чат
                  </a>
                </li>
                <li className="footer__item">
                  <Link to="/about-us" className="footer__link">
                    О нас
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <h3 className="footer__title">Компания</h3>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Чем мы занимаемся
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Доступные услуги
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    F.A.Q.
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <h3 className="footer__title">Наши новости</h3>
              <form action="" className="footer__form subscribe-form">
                <label className="subscribe-form__field">
                  <input type="email" required placeholder="Email" />
                  <button className="subscribe-form__btn btn-reset" type="submit">
                    Подписаться
                  </button>
                </label>
              </form>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="footer__left">
              <ul className="footer__list footer__list--row">
                <li className="footer__item footer__item--row">
                  <a href="№" className="footer__link footer__link--row">
                    Политика конфиденциальности
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__right">
              <ul className="social footer__social">
                <li className="social__item">
                  <a
                    href="#"
                    className="social__link social__link--tw"
                    aria-label="Go to twitter"></a>
                </li>
                <li className="social__item">
                  <a
                    href="#"
                    className="social__link social__link--fb"
                    aria-label="Go to facebook"></a>
                </li>
                <li className="social__item">
                  <a
                    href="#"
                    className="social__link social__link--inst"
                    aria-label="Go to instagram"></a>
                </li>
                <li className="social__item">
                  <a
                    href="#"
                    className="social__link social__link--pint"
                    aria-label="Go to pinterest"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
