import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import qs from 'qs'
import { fetchItems, fetchItemsBySearch } from '../redux/actions/products'
import { setSortBy } from '../redux/actions/filters'

const sizes = [46, 48, 50, 52, 54, 56]

function Filters({ sortBy, gender, page }) {
  const dispatch = useDispatch()
  const categories = useSelector(({ products }) => products.categories)
  let history = useHistory()
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(99999)
  const [visbileCategory, setVisbileCategory] = useState(false)
  const [visbilePrice, setVisbilePrice] = useState(false)
  const [visbileSizes, setVisbileSizes] = useState(false)
  const params = new URLSearchParams(useLocation().search)
  const sizeQuery = params.get('size')
  const categoryQuery = params.get('category')
  const priceQuery = params.get('price')
  const brandQuery = params.get('brand')
  const sortQuery = params.get('sort')
  const searchQuery = params.get('q')
  const genderQuery = params.get('gender')

  const [filters, setFilters] = useState({
    category: categoryQuery,
    size: sizeQuery,
    price: priceQuery,
    sort: sortQuery,
    brand: brandQuery,
    q: searchQuery,
    gender: genderQuery,
  })

  useEffect(() => {
    dispatch(setSortBy(sortQuery))
  }, [])

  useEffect(() => {
    if (sortBy === undefined) {
      setFilters({ ...filters, sort: null })
    } else {
      setFilters({ ...filters, sort: sortBy })
    }
  }, [sortBy])

  useEffect(() => {
    if (brandQuery === undefined) {
      setFilters({ ...filters, brand: null })
    } else {
      setFilters({ ...filters, brand: brandQuery })
    }
  }, [brandQuery])

  useEffect(() => {
    const query = {}

    if (!!filters.category) query.category = filters.category
    if (!!filters.size) query.size = filters.size
    if (!!filters.price) query.price = filters.price
    if (!!filters.sort) query.sort = filters.sort
    if (!!filters.brand) query.brand = filters.brand
    if (!!filters.q) query.q = filters.q
    if (!!filters.gender) query.gender = filters.gender
    if (parseInt(page) !== 1) query.page = page

    history.push({
      pathname: `/${gender}`,
      search: qs.stringify(query),
    })
  }, [filters, page])

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchItemsBySearch(searchQuery, genderQuery))
    } else {
      dispatch(
        fetchItems(sortQuery, gender, page, categoryQuery, sizeQuery, priceQuery, brandQuery),
      )
    }
  }, [page, sizeQuery, categoryQuery, priceQuery, brandQuery, sortQuery, searchQuery, genderQuery])

  useEffect(() => {
    if (searchQuery === undefined) {
      setFilters({ ...filters, q: null })
    } else {
      setFilters({ ...filters, q: searchQuery })
    }

    if (genderQuery === undefined) {
      setFilters({ ...filters, gender: null })
    } else {
      setFilters({ ...filters, gender: genderQuery })
    }
  }, [searchQuery, genderQuery])

  const getItemsByCategory = (id) => {
    if (id === undefined) {
      setFilters({ ...filters, category: null })
    } else {
      setFilters({ ...filters, category: id })
    }
  }

  const getItemsBySize = (size) => {
    if (size === undefined) {
      setFilters({ ...filters, size: null })
    } else {
      setFilters({ ...filters, size: size })
    }
  }

  const handlePriceInputChange = (e, type) => {
    if (type === 'min') {
      setMinPrice(e.target.value)
    }
    if (type === 'max') {
      setMaxPrice(e.target.value)
    }
  }

  const onSubmitPriceChanges = () => {
    if (minPrice === '' && maxPrice === '') {
      setFilters({ ...filters, price: null })
    } else {
      setFilters({ ...filters, price: `${minPrice}<${maxPrice}` })
    }
  }

  const resetFilters = () => {
    setFilters({
      category: null,
      size: null,
      price: null,
      sort: null,
      brand: null,
      q: null,
      gender: null,
    })
  }

  return (
    <div className="catalog-filters">
      <button class="hide-filters btn-reset" onClick={resetFilters}>
        Убрать фильтры
      </button>
      <div className={`catalog-filter ${visbileCategory ? 'catalog-filter--open' : ''}`}>
        <div className="catalog-filter__top" onClick={() => setVisbileCategory(!visbileCategory)}>
          <div className="catalog-filter__caption">
            <h3 className="catalog-filter__title">Категории</h3>
          </div>
          <span className="catalog-filter__toggle"></span>
        </div>
        <div className="catalog-filter__bottom ">
          <ul className="catalog-filter__items">
            <li className="catalog-filter__item" onClick={() => getItemsByCategory()}>
              <span>Все</span>
            </li>
            {categories &&
              categories.map((category) => (
                <li
                  className={`catalog-filter__item ${
                    category._id === filters.category ? 'active' : ''
                  }`}
                  key={category._id}
                  onClick={() => getItemsByCategory(category._id)}>
                  <span>{category.name}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={`catalog-filter ${visbileSizes ? 'catalog-filter--open' : ''}`}>
        <div className="catalog-filter__top" onClick={() => setVisbileSizes(!visbileSizes)}>
          <div className="catalog-filter__caption">
            <h3 className="catalog-filter__title">Размеры</h3>
          </div>
          <span className="catalog-filter__toggle"></span>
        </div>
        <div className="catalog-filter__bottom ">
          <ul className="catalog-filter__items">
            <li className="catalog-filter__item" onClick={() => getItemsBySize()}>
              <span>Все</span>
            </li>
            {sizes &&
              sizes.map((size) => (
                <li
                  className={`catalog-filter__item ${
                    size === parseInt(filters.size) ? 'active' : ''
                  }`}
                  key={size}
                  onClick={() => getItemsBySize(size)}>
                  <span>{size}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={`catalog-filter ${visbilePrice ? 'catalog-filter--open' : ''}`}>
        <div className="catalog-filter__top" onClick={() => setVisbilePrice(!visbilePrice)}>
          <div className="catalog-filter__caption">
            <h3 className="catalog-filter__title">Цена</h3>
          </div>
          <span className="catalog-filter__toggle"></span>
        </div>
        <div className="catalog-filter__bottom ">
          <ul className="catalog-filter__items catalog-filter__items--inputs">
            <label htmlFor="min" className="catalog-filter__label">
              <span>Минимальная цена</span>
              <input
                type="number"
                id="min"
                className="catalog-filter__input"
                onChange={(e) => handlePriceInputChange(e, 'min')}
                placeholder={0}
              />
            </label>
            <label htmlFor="max" className="catalog-filter__label">
              <span>Максимальная цена</span>
              <input
                type="number"
                id="max"
                className="catalog-filter__input"
                onChange={(e) => handlePriceInputChange(e, 'max')}
                placeholder={99999}
              />
            </label>
            <button className="catalog-filter__btn btn-reset" onClick={onSubmitPriceChanges}>
              Применить
            </button>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Filters
