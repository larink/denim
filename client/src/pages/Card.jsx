import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { fetchItem, removeCurrentProduct } from '../redux/actions/products'

function Card() {
  const params = useParams()
  const dispatch = useDispatch()
  const { product, isLoaded } = useSelector(({ currentProduct }) => currentProduct)
  const [currentProduct, setCurrentProduct] = useState({})

  useEffect(() => {
    if (isLoaded) {
      setCurrentProduct(...product)
    }
  }, [isLoaded])

  useEffect(() => {
    dispatch(fetchItem(params.id))

    return () => {
      dispatch(removeCurrentProduct())
    }
  }, [params.id])

  return (
    <div className="site-container">
      <Header color={'black'} />
      <main className="main">
        {Object.keys(product).length === 0 ? (
          <div>Загрузка...</div>
        ) : (
          <section className="card">
            <h2 className="visually-hidden">Product card</h2>
            <div className="breadcrumbs">
              <div className="container container-narrow">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a href="#" className="breadcrumbs__link">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a href="#" className="breadcrumbs__link">
                      Shop
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link breadcrumbs__link--current">New Arrivals</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card-content">
              <div className="card-content__top">
                <div className="card-top">
                  <div className="container container-narrow">
                    <div className="card-top__left">
                      <div className="card-slider">
                        {/* <div className="card-slider__thumbs">
                          <div className="card-slider__thumb">
                            <img src={currentProduct.imageUrl} alt="" />
                          </div>
                          <div className="card-slider__thumb">
                            <img src="img/card-main.jpg" alt="" />
                          </div>
                          <div className="card-slider__thumb">
                            <img src="https://via.placeholder.com/70x90" alt="" />
                          </div>
                          <div className="card-slider__thumb">
                            <img src="https://via.placeholder.com/70x90" alt="" />
                          </div>
                          <div className="card-slider__thumb">
                            <img src="img/card-main.jpg" alt="" />
                          </div>
                          <div className="card-slider__thumb">
                            <img src="https://via.placeholder.com/70x90" alt="" />
                          </div>
                          <div className="card-slider__thumb">
                            <img src="img/card-main.jpg" alt="" />
                          </div>
                        </div> */}
                        <div className="card-slider__main">
                          <img src={currentProduct.imageUrl} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="card-top__right">
                      <div className="card-info">
                        <span className="card-info__prop product-prop best">Best Seller</span>
                        <h3 className="card-info__title">{currentProduct.name}</h3>
                        <div className="card-info__rate">
                          <img src="img/stars.png" alt="Rating 4 of 5" />
                          <span>2 reviews</span>
                        </div>
                        <div className="card-info__price info-price">
                          <div className="info-price__current">{currentProduct.price}</div>
                          <div className="info-price__old">{currentProduct.oldPrice}</div>
                        </div>
                        <p className="card-info__descr">{currentProduct.descr}</p>
                        <div className="card-info__select card-info__first-select color-select">
                          <p className="color-select__selected ">
                            color:<span>green</span>
                          </p>
                          <ul className="color-select__list">
                            <li className="color-select__item">
                              <button
                                className="color-select__btn btn-reset"
                                data-color="red"
                                style={{ backgroundColor: 'red' }}
                                aria-label="Choice red color"></button>
                            </li>
                            <li className="color-select__item">
                              <button
                                className="color-select__btn btn-reset"
                                data-color="orange"
                                style={{ backgroundColor: 'orange' }}
                                aria-label="Choice orange color"></button>
                            </li>
                            <li className="color-select__item">
                              <button
                                className="color-select__btn btn-reset color-select__btn--active"
                                data-color="green"
                                style={{ backgroundColor: 'green' }}
                                aria-label="Choice green color"></button>
                            </li>
                            <li className="color-select__item">
                              <button
                                className="color-select__btn btn-reset"
                                data-color="white"
                                style={{ backgroundColor: 'white' }}
                                aria-label="Choice white color"></button>
                            </li>
                            <li className="color-select__item">
                              <button
                                className="color-select__btn btn-reset"
                                data-color="black"
                                style={{ backgroundColor: 'black' }}
                                aria-label="Choice black color"></button>
                            </li>
                            <li className="color-select__item">
                              <button
                                className="color-select__btn btn-reset"
                                data-color="brown"
                                style={{ backgroundColor: 'brown' }}
                                aria-label="Choice brown color"></button>
                            </li>
                            <li className="color-select__item">
                              <button
                                className="color-select__btn btn-reset"
                                data-color="purple"
                                style={{ backgroundColor: 'purple' }}
                                aria-label="Choice purple color"></button>
                            </li>
                            <li className="color-select__item">
                              <button
                                className="color-select__btn btn-reset"
                                data-color="grey"
                                style={{ backgroundColor: 'grey' }}
                                aria-label="Choice grey color"></button>
                            </li>
                          </ul>
                        </div>
                        <div className="card-info__select size-select card-info__second-select">
                          <p className="size-select__selected ">
                            size:<span>select a size</span>
                          </p>
                          <ul className="size-select__list">
                            <li className="size-select__item">
                              <button
                                className="size-select__btn btn-reset"
                                aria-label="Choice 23 size">
                                23
                              </button>
                            </li>
                            <li className="size-select__item">
                              <button
                                className="size-select__btn btn-reset"
                                aria-label="Choice 24 size">
                                24
                              </button>
                            </li>
                            <li className="size-select__item">
                              <button
                                className="size-select__btn btn-reset"
                                aria-label="Choice 25 size">
                                25
                              </button>
                            </li>
                            <li className="size-select__item">
                              <button
                                className="size-select__btn btn-reset"
                                aria-label="Choice 26 size">
                                26
                              </button>
                            </li>
                            <li className="size-select__item">
                              <button
                                className="size-select__btn btn-reset"
                                aria-label="Choice 27 size">
                                27
                              </button>
                            </li>
                            <li className="size-select__item">
                              <button
                                className="size-select__btn btn-reset"
                                aria-label="Choice 28 size">
                                28
                              </button>
                            </li>
                            <li className="size-select__item">
                              <button
                                className="size-select__btn btn-reset"
                                aria-label="Choice 29 size">
                                29
                              </button>
                            </li>
                            <li className="size-select__item">
                              <button
                                className="size-select__btn btn-reset"
                                aria-label="Choice 30 size">
                                30
                              </button>
                            </li>
                            <li className="size-select__item">
                              <button
                                className="size-select__btn btn-reset"
                                aria-label="Choice 31 size">
                                31
                              </button>
                            </li>
                          </ul>
                          <button className="btn-reset size-select__clear">
                            <svg>{/* <use xlink:href="img/sprite.svg#close"></use> */}</svg>
                            Clear
                          </button>
                        </div>
                        <div className="card-info__stepper stepper">
                          <button
                            className="btn-reset stepper__btn stepper__btn--minus"
                            aria-label="minus"
                            disabled>
                            <svg>{/* <use xlink:href="img/sprite.svg#minus"></use> */}</svg>
                          </button>
                          <input type="text" className="stepper__input" value="1" maxLength="5" />
                          <button
                            className="btn-reset stepper__btn stepper__btn--plus"
                            aria-label="minus">
                            <svg>{/* <use xlink:href="img/sprite.svg#plus"></use> */}</svg>
                          </button>
                        </div>
                        <button className="btn-reset card-info__btn card-info__btn--tocart">
                          Add to cart
                        </button>
                        <button className="btn-reset card-info__btn card-info__btn--towishlist">
                          Add to Wishlist
                        </button>
                        <div className="card-info__bottom card-bottom">
                          <div className="card-bottom__item">
                            <span>Sku:</span>FW511
                          </div>
                          <div className="card-bottom__item">
                            <span>Category:</span>
                            <a href="#">Trousers</a>,<a href="#">Life style</a>
                          </div>
                          <div className="card-bottom__item">
                            <span>Tags:</span>
                            <a href="#">Designer</a>,<a href="#">Women</a>
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
