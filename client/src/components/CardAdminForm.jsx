import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../redux/actions/products'

function CardAdminForm({ gender, product }) {
  const dispatch = useDispatch()
  const [changeProductForm, setChangeProductForm] = useState({
    name: null,
    imageUrl: null,
    description: null,
    price: null,
    gender: gender,
    brand: null,
    color: null,
    sizes: null,
    categoryProduct: null,
    countInStock: null,
    isPopular: false,
  })

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
        changeProductForm.sizes !== null && changeProductForm.sizes.length >= 1
          ? changeProductForm.sizes.split(',').map((size) => parseInt(size))
          : null,
      category: changeProductForm.categoryProduct,
      countInStock: changeProductForm.countInStock,
      isPopular: changeProductForm.isPopular,
    }

    dispatch(updateProduct(gender, newProduct))
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
    <form className="admin-form">
      <h2 className="admin-form__title">Изменить данные товара</h2>
      <label className="admin-form__label" htmlFor="">
        <span className="admin-form__span">Популярный</span>
        <input
          className="admin-form__input"
          type="checkbox"
          name="isPopular"
          value={changeProductForm.isPopular}
          onChange={changeHandler}
        />
      </label>
      <button
        type="submit"
        className="admin-form__btn btn-reset"
        onClick={changeProductFromSubmitHandler}>
        Сохранить
      </button>
    </form>
  )
}

export default CardAdminForm
