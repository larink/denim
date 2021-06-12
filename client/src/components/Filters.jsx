import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { fetchItems } from '../redux/actions/products'

const sizes = [46, 48, 50, 52, 54, 56]

function Filters({ sortBy, gender, page }) {
  const dispatch = useDispatch()
  const categories = useSelector(({ products }) => products.categories)
  let history = useHistory()
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [visbileCategory, setVisbileCategory] = useState(false)
  const [visbilePrice, setVisbilePrice] = useState(false)
  const [visbileColor, setVisbileColor] = useState(false)
  const [visbileSizes, setVisbileSizes] = useState(false)
  const params = new URLSearchParams(useLocation().search)
  const sizeQuery = params.get('size')
  const categoryQuery = params.get('category')

  useEffect(() => {
    dispatch(fetchItems(sortBy, gender, page, categoryQuery, sizeQuery))
  }, [])

  const getItemsByCategory = (id) => {
    dispatch(fetchItems(sortBy, gender, page, id))
    history.replace(`/${gender}/?category=${id}`)
  }

  const getItemsBySize = (size) => {
    dispatch(fetchItems(sortBy, gender, page, '', size))
    history.replace(`/${gender}/?size=${size}`)
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
    dispatch(fetchItems(sortBy, gender, page, '', minPrice, maxPrice))
  }

  return (
    <div className="catalog-filters">
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
                  className="catalog-filter__item"
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
              sizes.map((size, index) => (
                <li
                  className="catalog-filter__item"
                  key={index}
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
      <div className={`catalog-filter ${visbileColor ? 'catalog-filter--open' : ''}`}>
        <div className="catalog-filter__top" onClick={() => setVisbileColor(!visbileColor)}>
          <div className="catalog-filter__caption">
            <h3 className="catalog-filter__title">Color</h3>
          </div>
          <span className="catalog-filter__toggle"></span>
        </div>
        <div className="catalog-filter__bottom">
          <ul className="catalog-filter__items"></ul>
        </div>
      </div>
    </div>
  )
}

export default Filters
