import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CardAdminForm from '../components/CardAdminForm'
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
  const { user, isAuthenticated } = useSelector(({ auth }) => auth)
  const [currentSize, setCurrentSize] = useState(null)
  const [chooseAlert, setChooseAlert] = useState(false)
  const [logonAlert, setLogonAlert] = useState(false)
  const [addButtonPressed, setAddButtonPressed] = useState(false)

  useEffect(() => {
    dispatch(fetchItem(params.id, currentSize))
    if (isLoaded) dispatch(getCategory(gender, product.category))

    return () => {
      dispatch(removeCurrentProduct())
      dispatch(removeCategory())
    }
  }, [params.id])

  useEffect(() => {
    if (isLoaded) dispatch(getCategory(gender, product.category))

    return () => {
      dispatch(removeCategory())
    }
  }, [isLoaded])

  useEffect(() => {
    if (isAuthenticated) {
      setLogonAlert(false)
    } else {
      setLogonAlert(true)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (addButtonPressed) {
      setTimeout(() => {
        setAddButtonPressed(!addButtonPressed)
      }, 5000)
    }
  }, [addButtonPressed])

  const addToCart = () => {
    if (user !== null) {
      if (currentSize !== null) {
        dispatch(addCartItem(user._id, product._id, currentSize))
        setAddButtonPressed(!addButtonPressed)
      } else {
        setChooseAlert(!chooseAlert)
      }
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

  const isAdmin = () => {
    if (user !== null && user.role && user.role === 'admin') {
      return true
    } else {
      return false
    }
  }

  const validateBrand = (brand) => {
    if (brand && brand.includes('&')) return brand.replace(/[^a-zA-Z0-9 ]/g, '')
    return brand
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
                        <h3 className="card-info__title">{product.name}</h3>
                        {/* <Link
                          to={`/brands/${product.brand && validateBrand(product.brand)}`}
                          className="card-info__brand main-link">
                          {product.brand}s
                        </Link> */}
                        <Link
                          to={`/${gender}/?brand=${product.brand && validateBrand(product.brand)}`}
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
                        {logonAlert && (
                          <div className="choose-alert">
                            Пожалуйста, войдите в аккаунт или зарегестрируйте его, чтобы добавлять
                            товар в корзину
                          </div>
                        )}
                        <button
                          className={`btn-reset card-info__btn card-info__btn--tocart ${
                            !isAuthenticated ? 'disabled' : ''
                          }`}
                          onClick={addToCart}
                          disabled={!isAuthenticated}>
                          {addButtonPressed ? (
                            <span>
                              <svg
                                version="1.1"
                                x="0px"
                                y="0px"
                                width="45.701px"
                                height="45.7px"
                                viewBox="0 0 45.701 45.7">
                                <g>
                                  <path
                                    d="M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504
			c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0
			c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"
                                  />
                                </g>
                              </svg>
                              Товар добавлен
                            </span>
                          ) : (
                            <span>Добавить в корзину</span>
                          )}
                        </button>
                        {isAdmin() ? <CardAdminForm gender={gender} product={product} /> : null}
                        <div className="card-info__bottom card-bottom">
                          <div className="card-bottom__item">
                            <span>Категория:</span>
                            <Link
                              to={`/${gender}/?category=${category[0] && category[0]._id}`}
                              className="main-link">
                              {category[0] && category[0].name}
                            </Link>
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
