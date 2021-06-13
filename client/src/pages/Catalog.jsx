import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../redux/actions/products'
import Product from '../components/Product'
import SortDropdown from '../components/SortDropdown'
import { setSortBy } from '../redux/actions/filters'
import Filters from '../components/Filters'
import { useLocation } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Breadcrumbs from '../components/Breadcrumbs'

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
  const { pathname } = useLocation()
  const { items, searchedItems } = useSelector(({ products }) => products)
  const sortBy = useSelector(({ filters }) => filters.sortBy)
  const gender = useSelector(({ app }) => app.gender)

  const query = useQuery()
  const page = query.get('page') || 1

  useEffect(() => {
    dispatch(getCategories(gender))
  }, [])

  const onSelectItem = (item) => {
    dispatch(setSortBy(item))
  }

  return (
    <div className="site-container">
      <Header color={'black'} />
      <main className="main">
        <div className="hero-catalog">
          <div className="container container-narrow hero-catalog__container"></div>
        </div>
        <section className="catalog">
          <h2 className="visually-hidden">Catalog</h2>
          <Breadcrumbs />
          <div className="catalog-content">
            <div className="container container-narrow">
              <Filters sortBy={sortBy} gender={gender} page={page} />
              <div className="catalog-grid">
                <div className="catalog-grid__props catalog-props">
                  <div className="catalog-props__top">
                    <SortDropdown
                      items={sortItems}
                      onSelectItem={onSelectItem}
                      activeSortType={sortBy}
                    />
                  </div>
                  <div className="catalog-props__choice catalog-choice">
                    <button className="btn-reset catalog-choice__clear">Clear all</button>
                  </div>
                  {items && items.length !== 0 ? (
                    <>
                      <ul className="catalog-grid__content" data-grid-columns="4">
                        {pathname.includes('search')
                          ? searchedItems &&
                            searchedItems.map((product) => (
                              <Product key={product._id} {...product} gender={gender} />
                            ))
                          : items &&
                            items.map((product) => (
                              <Product key={product._id} {...product} gender={gender} />
                            ))}
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
    </div>
  )
}

export default Catalog
