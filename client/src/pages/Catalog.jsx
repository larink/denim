import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems, getCategories } from '../redux/actions/products'
import Product from '../components/Product'
import SortDropdown from '../components/SortDropdown'
import { setGenderState, setSortBy } from '../redux/actions/filters'
import Filters from '../components/Filters'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'

const sortItems = [
  { name: 'Популярности', type: 'rating' },
  { name: 'Цене по возростанию', type: 'price' },
  { name: 'Цене по убыванию', type: '-price' },
]

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Catalog() {
  const dispatch = useDispatch()
  const products = useSelector(({ products }) => products.items)
  const sortBy = useSelector(({ filters }) => filters.sortBy)
  const gender = useSelector(({ app }) => app.gender)

  const query = useQuery()
  const history = useHistory()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  useEffect(() => {
    let gender = history.location.pathname.split('/')[1]
    dispatch(setGenderState(gender))
    dispatch(fetchItems(sortBy, gender, page))
  }, [sortBy, page])

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const onSelectItem = (item) => {
    dispatch(setSortBy(item))
  }

  return (
    <div className="site-container">
      <Header color={'black'} />
      <main className="main">
        <div className="hero-catalog">
          <div className="container container-narrow hero-catalog__container">
            <div className="hero-catalog__slider">
              <button className="hero-prev-btn btn-reset">
                <svg>{/* <use xlink:href="img/sprite.svg#prev-arrow"></use> */}</svg>
              </button>
              <button className="hero-next-btn btn-reset">
                <svg>{/* <use xlink:href="img/sprite.svg#next-arrow"></use> */}</svg>
              </button>
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="catalog-slide">
                    <h2 className="catalog-slide__title">
                      The best thing about going back to school?
                    </h2>
                    <p className="catalog-slide__descr">
                      This fall denim is king! Denim is officially back in and cool to wear in all
                      its many forms
                    </p>
                    <div className="catalog-slide__btns">
                      <a href="#" className="catalog-slide__link catalog-slide__link--dark">
                        Discovery
                      </a>
                      <a href="#" className="catalog-slide__link catalog-slide__link--light">
                        Shop now
                      </a>
                    </div>
                    <img
                      src="img/girl-banner.png"
                      alt="girl on banner"
                      className="catalog-slide__image"
                    />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="catalog-slide">
                    <h2 className="catalog-slide__title">
                      The best thing about going back to school?
                    </h2>
                    <p className="catalog-slide__descr">
                      This fall denim is king! Denim is officially back in and cool to wear in all
                      its many forms
                    </p>
                    <div className="catalog-slide__btns">
                      <a href="#" className="catalog-slide__link catalog-slide__link--dark">
                        Discovery
                      </a>
                      <a href="#" className="catalog-slide__link catalog-slide__link--light">
                        Shop now
                      </a>
                    </div>
                    <img
                      src="img/girl-banner.png"
                      alt="girl on banner"
                      className="catalog-slide__image"
                    />
                  </div>
                </div>
              </div>
              <div className="swiper-pagination hero-pag"></div>
            </div>
          </div>
        </div>
        <section className="catalog">
          <h2 className="visually-hidden">Catalog</h2>
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
          <div className="catalog-content">
            <div className="container container-narrow">
              <Filters sortBy={sortBy} gender={gender} page={page} />
              <div className="catalog-grid">
                <div className="catalog-grid__props catalog-props">
                  <div className="catalog-props__top">
                    <button className="btn-reset catalog-mobile-filters">
                      <svg
                        height="394pt"
                        viewBox="-5 0 394 394.00003"
                        width="394pt"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="m367.820312 0h-351.261718c-6.199219-.0117188-11.878906 3.449219-14.710938 8.960938-2.871094 5.585937-2.367187 12.3125 1.300782 17.414062l128.6875 181.285156c.042968.0625.089843.121094.132812.183594 4.675781 6.3125 7.207031 13.960938 7.21875 21.816406v147.800782c-.027344 4.375 1.691406 8.582031 4.773438 11.6875 3.085937 3.101562 7.28125 4.851562 11.65625 4.851562 2.222656-.003906 4.425781-.445312 6.480468-1.300781l72.3125-27.570313c6.476563-1.980468 10.777344-8.09375 10.777344-15.453125v-120.015625c.011719-7.855468 2.542969-15.503906 7.214844-21.816406.042968-.0625.089844-.121094.132812-.183594l128.691406-181.289062c3.667969-5.097656 4.171876-11.820313 1.300782-17.40625-2.828125-5.515625-8.511719-8.9765628-14.707032-8.964844zm0 0" />
                      </svg>
                      <span>Filters</span>
                    </button>
                    <div className="catalog-props__columns catalog-columns">
                      <span className="catalog-columns__text">Column number:</span>
                      <ul className="catalog-columns__list">
                        <li className="catalog-columns__item">
                          <button
                            className="btn-reset main-link catalog-columns__btn"
                            data-columns="3">
                            3
                          </button>
                        </li>
                        <li className="catalog-columns__item">
                          <button
                            className="btn-reset main-link catalog-columns__btn catalog-columns__btn--current"
                            data-columns="4">
                            4
                          </button>
                        </li>
                        <li className="catalog-columns__item">
                          <button
                            className="btn-reset main-link catalog-columns__btn"
                            data-columns="5">
                            5
                          </button>
                        </li>
                      </ul>
                    </div>
                    <SortDropdown
                      items={sortItems}
                      onSelectItem={onSelectItem}
                      activeSortType={sortBy}
                    />
                  </div>
                  <div className="catalog-props__choice catalog-choice">
                    <button className="btn-reset catalog-choice__clear">Clear all</button>
                  </div>
                  {products.length !== 0 ? (
                    <>
                      <ul className="catalog-grid__content" data-grid-columns="4">
                        {products &&
                          products.map((product) => <Product key={product._id} {...product} />)}
                      </ul>
                      <Pagination page={page} />
                    </>
                  ) : (
                    <p className="catalog-grid__no-items">В данной категории нету товара</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <a href="#" className="to-top">
        <svg>{/* <use xlink:href="img/sprite.svg#to-top"></use> */}</svg>
      </a>
    </div>
  )
}

export default Catalog
