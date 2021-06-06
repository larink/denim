import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '../redux/actions/products'

function Filters({ sortBy, gender, page }) {
  const dispatch = useDispatch()
  const categories = useSelector(({ products }) => products.categories)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [visbileCategory, setVisbileCategory] = useState(false)
  const [visbilePrice, setVisbilePrice] = useState(false)
  const [visbileColor, setVisbileColor] = useState(false)

  const getItemsByCategory = (id) => {
    dispatch(fetchItems(sortBy, gender, page, id))
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
                  onClick={() => getItemsByCategory(category._id)}>
                  <span>{category.name}</span>
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
