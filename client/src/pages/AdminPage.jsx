import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SecondHeader from '../components/SecondHeader'
import {
  createCategory,
  createProduct,
  fetchItems,
  getCategories,
  getItems,
  updateProduct,
} from '../redux/actions/products'

function AdminPage() {
  const dispatch = useDispatch()
  const { gender } = useSelector(({ app }) => app)
  const { sortBy } = useSelector(({ filters }) => filters)
  const { categories, items } = useSelector(({ products }) => products)
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    gender: '',
  })
  const [productForm, setProductForm] = useState({
    name: '',
    imageUrl: '',
    description: '',
    price: 0,
    gender: 'men',
    brand: '',
    color: '',
    sizes: [],
    categoryProduct: '',
    countInStock: 1,
  })
  const [changeProductForm, setChangeProductForm] = useState({
    id: '',
    name: '',
    imageUrl: '',
    description: '',
    price: 0,
    gender: 'men',
    brand: '',
    color: '',
    sizes: [],
    categoryProduct: '',
    countInStock: 1,
  })

  console.log(changeProductForm)

  useEffect(() => {
    dispatch(getCategories(productForm.gender))
  }, [productForm.gender])

  useEffect(() => {
    dispatch(getCategories(changeProductForm.gender))
  }, [changeProductForm.gender])

  useEffect(() => {
    dispatch(getItems())
  }, [])

  const changeHandler = (e) => {
    const target = e.target

    if (target.name.split('/').includes('category')) {
      setCategoryForm({ ...categoryForm, [target.name.split('/')[1]]: target.value })
    } else if (target.name.split('/').includes('product')) {
      setProductForm({ ...productForm, [target.name.split('/')[1]]: target.value })
    } else if (target.name.split('/').includes('changeProduct')) {
      setChangeProductForm({ ...productForm, [target.name.split('/')[1]]: target.value })
    }
  }

  const productFromSubmitHandler = (e) => {
    e.preventDefault()

    const product = {
      name: productForm.name,
      imageUrl: productForm.imageUrl,
      descr: productForm.description,
      price: productForm.price,
      gender: productForm.gender,
      brand: productForm.brand,
      color: productForm.color,
      sizes: productForm.sizes.split(',').map((size) => parseInt(size)),
      category: productForm.categoryProduct,
      countInStock: productForm.countInStock,
    }

    dispatch(createProduct(product))
    setProductForm({
      name: '',
      imageUrl: '',
      description: '',
      price: 0,
      gender: '',
      brand: '',
      color: '',
      sizes: [],
      categoryProduct: '',
      countInStock: 1,
    })
  }
  const changeProductFromSubmitHandler = (e) => {
    e.preventDefault()

    const product = {
      id: changeProductForm.id,
      name: changeProductForm.name,
      imageUrl: changeProductForm.imageUrl,
      descr: changeProductForm.description,
      price: changeProductForm.price,
      gender: changeProductForm.gender,
      brand: changeProductForm.brand,
      color: changeProductForm.color,
      sizes:
        changeProductForm.sizes.length >= 1
          ? changeProductForm.sizes.split(',').map((size) => parseInt(size))
          : [],
      category: changeProductForm.categoryProduct,
      countInStock: changeProductForm.countInStock,
    }

    dispatch(updateProduct(gender, product))
    setProductForm({
      name: '',
      imageUrl: '',
      description: '',
      price: 0,
      gender: '',
      brand: '',
      color: '',
      sizes: [],
      categoryProduct: '',
      countInStock: 1,
    })
  }

  const categoryFromSubmitHandler = (e) => {
    e.preventDefault()

    const category = {
      name: categoryForm.name,
      gender: categoryForm.gender,
    }

    dispatch(createCategory(category))
    setCategoryForm({ name: '', gender: '' })
  }

  return (
    <div className="site-container">
      <SecondHeader />
      <h1>Админ-панель сайта</h1>
      <div className="">
        <h2>Добавить товар</h2>
        <form action="">
          <label htmlFor="">
            Наименование товара:
            <input
              type="text"
              name="product/name"
              value={productForm.name}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Ссылка на картинку товара:
            <input
              type="text"
              name="product/imageUrl"
              value={productForm.imageUrl}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Описание товара:
            <input
              type="text"
              name="product/description"
              value={productForm.description}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Цена товара:
            <input
              type="text"
              name="product/price"
              value={productForm.price}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Пол:
            <select
              name="product/gender"
              value={productForm.gender}
              onChange={(e) => changeHandler(e)}>
              <option value="men">Мужской</option>
              <option value="women">Женский</option>
            </select>
          </label>
          <label htmlFor="">
            Бренд товара:
            <input
              type="text"
              name="product/brand"
              value={productForm.brand}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Цвет товара:
            <input
              type="text"
              name="product/color"
              value={productForm.color}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Доступные размеры:
            <input
              type="text"
              name="product/sizes"
              value={productForm.sizes}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Категория товара:
            {/* <input type="text" name="category" /> */}
            <select
              name="product/categoryProduct"
              value={productForm.category}
              onChange={(e) => changeHandler(e)}>
              {categories &&
                categories.map((category) => <option value={category._id}>{category.name}</option>)}
            </select>
          </label>
          <label htmlFor="">
            Количество в наличии:
            <input
              type="number"
              name="product/countInStock"
              value={productForm.countInStock}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <button type="submit" onClick={productFromSubmitHandler}>
            Добавить
          </button>
        </form>
      </div>
      <div className="">
        <h2>Изменить товар:</h2>
        <form action="">
          <label htmlFor="">
            Выберите товар:
            <select
              name="changeProduct/id"
              value={changeProductForm.id}
              onChange={(e) => changeHandler(e)}>
              {items &&
                items.map((product) => (
                  <option value={product._id} key={product._id}>
                    {product.name} Пол {product.gender === 'men' ? 'Мужской' : 'Женский'}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="">
            Наименование товара:
            <input
              type="text"
              name="changeProduct/name"
              value={changeProductForm.name}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Ссылка на картинку товара:
            <input
              type="text"
              name="changeProduct/imageUrl"
              value={changeProductForm.imageUrl}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Описание товара:
            <input
              type="text"
              name="changeProduct/description"
              value={changeProductForm.description}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Цена товара:
            <input
              type="text"
              name="changeProduct/price"
              value={changeProductForm.price}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Пол:
            <select
              name="changeProduct/gender"
              value={changeProductForm.gender}
              onChange={(e) => changeHandler(e)}>
              <option value="men">Мужской</option>
              <option value="women">Женский</option>
            </select>
          </label>
          <label htmlFor="">
            Бренд товара:
            <input
              type="text"
              name="changeProduct/brand"
              value={changeProductForm.brand}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Цвет товара:
            <input
              type="text"
              name="changeProduct/color"
              value={changeProductForm.color}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Доступные размеры:
            <input
              type="text"
              name="changeProduct/sizes"
              value={changeProductForm.sizes}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <label htmlFor="">
            Категория товара:
            {/* <input type="text" name="category" /> */}
            <select
              name="changeProduct/categoryProduct"
              value={changeProductForm.category}
              onChange={(e) => changeHandler(e)}>
              {categories &&
                categories.map((category) => <option value={category._id}>{category.name}</option>)}
            </select>
          </label>
          <label htmlFor="">
            Количество в наличии:
            <input
              type="number"
              name="changeProduct/countInStock"
              value={changeProductForm.countInStock}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <button type="submit" onClick={changeProductFromSubmitHandler}>
            Изменить
          </button>
        </form>
      </div>
      <div className="">
        <h2>Добавить категорию</h2>
        <form action="">
          <label htmlFor="">
            Название категории:
            <input
              type="name"
              name="category/name"
              value={categoryForm.name}
              onChange={(e) => changeHandler(e)}
              required
            />
          </label>
          <label htmlFor="">
            Для какого пола категория:
            <select
              name="category/gender"
              value={categoryForm.gender}
              onChange={(e) => changeHandler(e)}>
              <option value="men">Мужской</option>
              <option value="women">Женский</option>
            </select>
          </label>
          <button type="submit" onClick={categoryFromSubmitHandler}>
            Добавить
          </button>
        </form>
      </div>
      <div className="">
        <h2>Выдать пользователю роль</h2>
        <label htmlFor="">
          ID пользователя
          <input type="text" />
        </label>
        <label htmlFor="">
          Роль
          <select name="" id="">
            <option value="customer">Покупатель</option>
            <option value="employer">Работник</option>
            <option value="admin">Админ</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default AdminPage
