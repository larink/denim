import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../redux/actions/products'

function CardAdminForm({ gender, product }) {
  const dispatch = useDispatch()
  const [adminFormVisible, setAdminFormVisible] = useState(false)
  const [successUpdate, setSuccessUpdate] = useState(false)
  const [changeProductForm, setChangeProductForm] = useState({
    name: product.name,
    imageUrl: product.imageUrl,
    description: product.descr,
    price: product.price,
    gender: gender,
    brand: product.brand,
    color: product.color,
    sizes: product.sizes,
    categoryProduct: product.category,
    countInStock: product.countInStock,
    isPopular: product.isPopular,
  })

  useEffect(() => {
    if (successUpdate) {
      setTimeout(() => {
        setSuccessUpdate(!successUpdate)
      }, 5000)
    }
  }, [successUpdate])

  const changeHandler = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name

    setChangeProductForm({ ...changeProductForm, [name]: value })
  }

  const changeProductFromSubmitHandler = (e) => {
    e.preventDefault()

    const newProduct = {
      id: product._id,
      name: changeProductForm.name,
      imageUrl: changeProductForm.imageUrl,
      descr: changeProductForm.description,
      price: changeProductForm.price,
      gender: changeProductForm.gender,
      brand: changeProductForm.brand,
      color: changeProductForm.color,
      sizes:
        typeof changeProductForm.sizes === 'string'
          ? changeProductForm.sizes.split(',').map((size) => parseInt(size))
          : changeProductForm.sizes,
      category: changeProductForm.categoryProduct,
      countInStock: changeProductForm.countInStock,
      isPopular: changeProductForm.isPopular,
    }

    dispatch(updateProduct(gender, newProduct))
    setSuccessUpdate(!successUpdate)
    setChangeProductForm({
      name: '',
      imageUrl: '',
      description: '',
      price: null,
      gender: '',
      brand: '',
      color: '',
      sizes: null,
      categoryProduct: '',
      countInStock: null,
      isPopular: false,
    })
  }

  return (
    <>
      <div className="admin-form__top" onClick={() => setAdminFormVisible(!adminFormVisible)}>
        <h2 className="admin-form__title">Изменить данные товара</h2>
        <button className="btn-reset admin-form__close">
          <svg
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 451.847 451.847"
            className={`${adminFormVisible ? 'rotate' : ''}`}>
            <g>
              <path
                d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
              />
            </g>
          </svg>
        </button>
      </div>
      {adminFormVisible && (
        <>
          <form className="admin-form">
            <label className="admin-form__label" htmlFor="">
              <span className="admin-form__span">Популярный</span>
              <input
                className="admin-form__input"
                type="checkbox"
                name="isPopular"
                value={changeProductForm.isPopular}
                checked={changeProductForm.isPopular}
                onChange={changeHandler}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              Наименование товара:
              <input
                type="text"
                name="name"
                value={changeProductForm.name}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              Ссылка на картинку товара:
              <input
                type="text"
                name="imageUrl"
                value={changeProductForm.imageUrl}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              Описание товара:
              <input
                type="text"
                name="description"
                value={changeProductForm.description}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              Цена товара:
              <input
                type="text"
                name="price"
                value={changeProductForm.price}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              Пол:
              <select
                className="admin-form__select"
                name="gender"
                value={changeProductForm.gender}
                onChange={(e) => changeHandler(e)}>
                <option value="men">Мужской</option>
                <option value="women">Женский</option>
              </select>
            </label>
            <label htmlFor="" className="admin-form__label">
              Бренд товара:
              <input
                type="text"
                name="brand"
                value={changeProductForm.brand}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              Цвет товара:
              <input
                type="text"
                name="color"
                value={changeProductForm.color}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              Доступные размеры:
              <input
                type="text"
                name="sizes"
                value={changeProductForm.sizes}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              Категория товара:
              {/* <input type="text" name="category" /> */}
              <select
                className="admin-form__select"
                name="categoryProduct"
                value={changeProductForm.category}
                onChange={(e) => changeHandler(e)}>
                {/* {categories &&
                    categories.map((category) => (
                      <option value={category._id}>{category.name}</option>
                    ))} */}
              </select>
            </label>
            <label htmlFor="" className="admin-form__label">
              Количество в наличии:
              <input
                type="number"
                name="countInStock"
                value={changeProductForm.countInStock}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <button
              type="submit"
              className="admin-form__btn btn-reset"
              onClick={changeProductFromSubmitHandler}>
              {successUpdate ? (
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
                  Товар изменен
                </span>
              ) : (
                <span>Изменить</span>
              )}
            </button>
          </form>
        </>
      )}
    </>
  )
}

export default CardAdminForm
