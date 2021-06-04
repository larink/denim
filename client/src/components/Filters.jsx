import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '../redux/actions/products'

function Filters({ sortBy, gender, page }) {
  const dispatch = useDispatch()
  const categories = useSelector(({ products }) => products.categories)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)

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
      <button className="hide-filters btn-reset">Hide filters</button>
      <div className="catalog-filter catalog-filter--open">
        <div className="catalog-filter__top">
          <div className="catalog-filter__caption">
            <h3 className="catalog-filter__title">Категории</h3>
            <span className="catalog-filter__quantity quantity">1</span>
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
      <div className="catalog-filter catalog-filter--open">
        <div className="catalog-filter__top">
          <div className="catalog-filter__caption">
            <h3 className="catalog-filter__title">Цена</h3>
            <span className="catalog-filter__quantity quantity">1</span>
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
      <div className="catalog-filter">
        <div className="catalog-filter__top">
          <div className="catalog-filter__caption">
            <h3 className="catalog-filter__title">Color</h3>
            <span className="catalog-filter__quantity quantity">3</span>
          </div>
          <span className="catalog-filter__toggle"></span>
        </div>
        <div className="catalog-filter__bottom">
          <ul className="catalog-filter__items">
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text">All categories</span>
              </label>
            </li>
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text">Accessories</span>
              </label>
            </li>
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text">Dresses</span>
              </label>
            </li>
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text"> Coats</span>
              </label>
            </li>
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text">Clothes</span>
              </label>
            </li>
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text">T-Shirt</span>
              </label>
            </li>
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text">Summer</span>
              </label>
            </li>
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text">Shirts</span>
              </label>
            </li>
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text"> Jacket</span>
              </label>
            </li>
            <li className="catalog-filter__item">
              <label className="custom-checkbox">
                <input type="checkbox" className="custom-checkbox__input visually-hidden" />
                <span className="custom-checkbox__text">Short</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Filters
