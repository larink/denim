import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__content">
          <div className="footer__top">
            <div className="footer__column">
              <h3 className="footer__title">Customer service</h3>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="tel: +8665972742" className="footer__link">
                    Phone: +866.597.2742
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Live chat
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    About Us
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <h3 className="footer__title">Company</h3>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    What We Do
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Available Services
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Latest Posts
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <h3 className="footer__title">Our newsletter</h3>
              <form action="" className="footer__form subscribe-form">
                <h4 className="subscribe-form__title">
                  Join our list and get 15% off your first purchase!
                </h4>
                <label className="subscribe-form__field">
                  <input type="email" required placeholder="Email Address" />
                  <button className="subscribe-form__btn btn-reset" type="submit">
                    Subscribe
                  </button>
                </label>
              </form>
              <span className="footer__text">*Don’t worry we don’t spam</span>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="footer__left">
              <ul className="footer__list footer__list--row">
                <li className="footer__item footer__item--row">
                  <a href="№" className="footer__link footer__link--row">
                    Returns Policy
                  </a>
                </li>
                <li className="footer__item footer__item--row">
                  <a href="№" className="footer__link footer__link--row">
                    Privacy Policy
                  </a>
                </li>
                <li className="footer__item footer__item--row">
                  <a href="№" className="footer__link footer__link--row">
                    Privacy Policy
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
