import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { addCartItem } from '../redux/actions/cart'

import {
  fetchItem,
  getCategory,
  removeCategory,
  removeCurrentProduct,
} from '../redux/actions/products'

function Card() {
  const params = useParams()
  const dispatch = useDispatch()
  const { product, isLoaded, category } = useSelector(({ currentProduct }) => currentProduct)
  const gender = useSelector(({ app }) => app.gender)
  const user = useSelector(({ auth }) => auth.user)
  const [currentSize, setCurrentSize] = useState(null)
  const [chooseAlert, setChooseAlert] = useState(false)

  useEffect(() => {
    dispatch(fetchItem(params.id, currentSize))
    if (isLoaded) dispatch(getCategory(product.category))
    return () => {
      dispatch(removeCurrentProduct())
      dispatch(removeCategory())
    }
  }, [params.id])

  useEffect(() => {
    if (isLoaded) dispatch(getCategory(product.category))

    return () => {
      dispatch(removeCategory())
    }
  }, [isLoaded])

  const addToCart = () => {
    if (user !== null) {
      if (currentSize !== null) {
        dispatch(addCartItem(user.id, product._id, currentSize))
      } else {
        setChooseAlert(!chooseAlert)
      }
    } else {
      // localStorage.setItem('cartItems', JSON.stringify(products))
    }
  }

  const onSizeSelect = (size) => {
    setCurrentSize(size)
    if (chooseAlert) setChooseAlert(false)
  }

  const setActiveSize = (size) => {
    if (size === currentSize) {
      return 'size-select__btn--active'
    } else {
      return ''
    }
  }

  return (
    <div className="site-container">
      <Header color={'black'} />
      <main className="main">
        {Object.keys(product).length === 0 ? (
          <div>Загрузка...</div>
        ) : (
          <section className="card">
            <h2 className="visually-hidden">Product card</h2>
            <Breadcrumbs category={category} />
            <div className="card-content">
              <div className="card-content__top">
                <div className="card-top">
                  <div className="container container-narrow">
                    <div className="card-top__left">
                      <div className="card-slider">
                        <div className="card-slider__main">
                          <img src={product.imageUrl} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="card-top__right">
                      <div className="card-info">
                        <span className="card-info__prop product-prop best">Best Seller</span>
                        <h3 className="card-info__title">{product.name}</h3>
                        <Link
                          to={`/brands/${product.brand && product.brand.trim()}`}
                          className="card-info__brand main-link">
                          {product.brand}
                        </Link>
                        <div className="card-info__price info-price">
                          <div className="info-price__current">{product.price}₽</div>
                          {product.oldPrice && (
                            <div className="info-price__old">{product.oldPrice}₽</div>
                          )}
                        </div>
                        <p className="card-info__descr">{product.descr}</p>
                        <div className="card-info__select card-info__first-select color-select">
                          <p className="color-select__selected ">
                            Цвет: <span>{product.color ? product.color : 'Не указан'}</span>
                          </p>
                        </div>
                        <div className="card-info__select size-select card-info__second-select">
                          <p className="size-select__selected ">
                            размер:<span>{currentSize ? currentSize : 'выберите размер'}</span>
                          </p>
                          <ul className="size-select__list">
                            {product.sizes &&
                              product.sizes.map((size, index) => (
                                <li className="size-select__item" key={index}>
                                  <button
                                    className={`size-select__btn btn-reset ${setActiveSize(size)}`}
                                    aria-label="Choice 23 size"
                                    onClick={() => onSizeSelect(size)}>
                                    {size}
                                  </button>
                                </li>
                              ))}
                          </ul>
                        </div>
                        {chooseAlert && (
                          <div className="choose-alert">
                            Пожалуйста, выберите имеющийся в наличии размер
                          </div>
                        )}
                        <button
                          className="btn-reset card-info__btn card-info__btn--tocart"
                          onClick={addToCart}>
                          Добавить в корзину
                        </button>
                        <button className="btn-reset card-info__btn card-info__btn--towishlist">
                          Добавить в желаемое
                        </button>
                        <div className="card-info__bottom card-bottom">
                          <div className="card-bottom__item">
                            <span>Sku:</span>FW511
                          </div>
                          <div className="card-bottom__item">
                            <span>Категория:</span>
                            <Link to={`/category/${product.type}`} className="main-link">
                              {product.type}
                            </Link>
                          </div>
                        </div>
                        <div className="card-bottom__social">
                          <span>Share:</span>
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
                </div>
                <div className="card-content__bottom">
                  <div className="card-bottom__content">
                    <div className="container container-narrow">
                      <div className="card-description">
                        <div className="card-description__left">
                          <ul className="card-description__navigation" data-simplebar>
                            <li className="card-description__item">
                              <a
                                href="#one"
                                className="card-description__link card-description__link--active">
                                Description
                              </a>
                            </li>
                            <li className="card-description__item">
                              <a href="#two" className="card-description__link">
                                Additional information
                              </a>
                            </li>
                            <li className="card-description__item">
                              <a href="#three" className="card-description__link">
                                Reviews 2
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="card-description__right">
                          <div
                            className="card-description__content card-description__content--active"
                            data-target="#one">
                            <p>
                              123Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in
                              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est laborum. Sed ut
                              perspiciatis unde omnis iste natus error sit voluptatem accusantium
                              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                              inventore veritatis et quasi architecto beatae vitae dicta sunt
                              explicabo.
                            </p>
                            <p>
                              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                              fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
                              sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                              sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                              tempora incidunt ut labore et dolore magnam aliquam quaerat
                              voluptatem.
                            </p>
                          </div>
                          <div className="card-description__content" data-target="#two">
                            <p>
                              222Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in
                              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est laborum. Sed ut
                              perspiciatis unde omnis iste natus error sit voluptatem accusantium
                              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                              inventore veritatis et quasi architecto beatae vitae dicta sunt
                              explicabo.
                            </p>
                            <p>
                              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                              fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
                              sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                              sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                              tempora incidunt ut labore et dolore magnam aliquam quaerat
                              voluptatem.
                            </p>
                          </div>
                          <div className="card-description__content" data-target="#three">
                            <p>
                              333Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in
                              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est laborum. Sed ut
                              perspiciatis unde omnis iste natus error sit voluptatem accusantium
                              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                              inventore veritatis et quasi architecto beatae vitae dicta sunt
                              explicabo.
                            </p>
                            <p>
                              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                              fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
                              sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                              sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                              tempora incidunt ut labore et dolore magnam aliquam quaerat
                              voluptatem.
                            </p>
                          </div>
                          <div className="card-description__content" data-target="#four">
                            <p>
                              444Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in
                              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est laborum. Sed ut
                              perspiciatis unde omnis iste natus error sit voluptatem accusantium
                              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                              inventore veritatis et quasi architecto beatae vitae dicta sunt
                              explicabo.
                            </p>
                            <p>
                              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                              fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
                              sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                              sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                              tempora incidunt ut labore et dolore magnam aliquam quaerat
                              voluptatem.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Card
