import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import SecondHeader from '../components/SecondHeader'
import { getPayments, getUser, updateUser } from '../redux/actions/auth'
import { createCategory, createProduct, getCategories, getItems } from '../redux/actions/products'
import Product from '../components/Product'
import AdminPagination from '../components/AdminPaginaion'
import { validatePayment } from '../utils/helpers'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function AdminPage() {
  const dispatch = useDispatch()
  const { gender } = useSelector(({ app }) => app)
  const { payments, totalPages } = useSelector(({ auth }) => auth.payments || {})
  const { searchedUser } = useSelector(({ auth }) => auth.admin || {})
  const { categories } = useSelector(({ products }) => products)

  const query = useQuery()
  const page = query.get('page') || 1

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    gender: 'men',
  })

  const [updateUserRoleForm, setUpdateUserRoleForm] = useState({
    id: '',
    name: '',
    role: 'customer',
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

  useEffect(() => {
    dispatch(getCategories(productForm.gender ? productForm.gender : gender))
  }, [productForm.gender])

  useEffect(() => {
    dispatch(getItems())
  }, [])

  useEffect(() => {
    dispatch(getPayments(page))
  }, [page])

  const changeHandler = (e) => {
    const target = e.target

    if (target.name.split('/').includes('category')) {
      setCategoryForm({ ...categoryForm, [target.name.split('/')[1]]: target.value })
    } else if (target.name.split('/').includes('product')) {
      setProductForm({ ...productForm, [target.name.split('/')[1]]: target.value })
    } else if (target.name.split('/').includes('changeProduct')) {
      setChangeProductForm({ ...productForm, [target.name.split('/')[1]]: target.value })
    } else if (target.name.split('/').includes('updateRole')) {
      setUpdateUserRoleForm({ ...updateUserRoleForm, [target.name.split('/')[1]]: target.value })
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

    const { valid, message } = validatePayment(productForm)

    if (!valid) {
      alert(message)
      return
    }

    if (valid) alert('?????????? ?????????????? ????????????')

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

  const categoryFromSubmitHandler = (e) => {
    e.preventDefault()

    const category = {
      name: categoryForm.name,
      gender: categoryForm.gender,
    }

    const { valid, message } = validatePayment(category)

    if (!valid) {
      alert(message)
      return
    }

    if (valid) alert('?????????????????? ?????????????? ??????????????')

    dispatch(createCategory(category))
    setCategoryForm({ name: '', gender: '' })
  }

  const findUser = (e) => {
    e.preventDefault()

    dispatch(getUser(updateUserRoleForm.name))
    if (searchedUser) setUpdateUserRoleForm({ ...updateUserRoleForm, id: searchedUser._id })
  }

  const roleFormSubmitHandler = (e) => {
    e.preventDefault()

    const newUser = {
      id: updateUserRoleForm.id,
      role: updateUserRoleForm.role,
    }

    const { valid, message } = validatePayment(newUser)

    if (!valid) {
      alert(message)
      return
    }

    if (valid) alert('???????????????????????? ?????????????? ????????????????')

    dispatch(updateUser(newUser))
  }

  return (
    <div className="admin-page">
      <div className="container">
        <SecondHeader />
        <h1>??????????-???????????? ??????????</h1>
        <div className="">
          <h2>?????? ?????????????????????? ????????????</h2>
          <div className="payments">
            {payments && payments.length !== 0 ? (
              payments.map((payment) => (
                <div className="payments_payment payment">
                  <div className="payment__user">
                    <span>????????????????????????:</span>
                    <div className="">{payment.user.name}</div>
                    <div className="">{payment.user.email}</div>
                    <span>?????????? ????????????????:</span>
                    <div className="">
                      {payment.user.address && payment.user.address.firstName}{' '}
                      {payment.user.address && payment.user.address.lastName}
                    </div>
                    <div className="">{payment.user.address && payment.user.address.tel}</div>
                    <div className="">{payment.user.address && payment.user.address.home}</div>
                    <div className="">{payment.user.address && payment.user.address.country}</div>
                    <div className="">{payment.user.address && payment.user.address.city}</div>
                    <div className="">{payment.user.address && payment.user.address.region}</div>
                    <div className="">{payment.user.address && payment.user.address.index}</div>
                  </div>
                  <div className="">
                    ???????????????????? ????????????:
                    <ul className="payment__products">
                      {payment &&
                        payment.products.map((product) => (
                          <Product key={product.id} {...product} />
                        ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p>???????????? ?????? ???? ???????? ??????????????????</p>
            )}
          </div>
          {totalPages >= 1 ? <AdminPagination page={page} totalAdminPages={totalPages} /> : null}
        </div>
        <div className="">
          <h2>???????????????? ??????????</h2>
          <form action="admin-form">
            <label htmlFor="" className="admin-form__label">
              ???????????????????????? ????????????:
              <input
                type="text"
                className="admin-form__input"
                name="product/name"
                value={productForm.name}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              ???????????? ???? ???????????????? ????????????:
              <input
                type="text"
                className="admin-form__input"
                name="product/imageUrl"
                value={productForm.imageUrl}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              ???????????????? ????????????:
              <input
                type="text"
                className="admin-form__input"
                name="product/description"
                value={productForm.description}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              ???????? ????????????:
              <input
                type="text"
                className="admin-form__input"
                name="product/price"
                value={productForm.price}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              ??????:
              <select
                className="admin-form__select"
                name="product/gender"
                className="admin-form__input"
                value={productForm.gender}
                onChange={(e) => changeHandler(e)}>
                <option value="men">??????????????</option>
                <option value="women">??????????????</option>
              </select>
            </label>
            <label htmlFor="" className="admin-form__label">
              ?????????? ????????????:
              <input
                type="text"
                className="admin-form__input"
                name="product/brand"
                value={productForm.brand}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              ???????? ????????????:
              <input
                type="text"
                className="admin-form__input"
                name="product/color"
                value={productForm.color}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              ?????????????????? ??????????????:
              <input
                type="text"
                className="admin-form__input"
                name="product/sizes"
                value={productForm.sizes}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              ?????????????????? ????????????:
              <select
                className="admin-form__select"
                className="admin-form__input"
                name="product/categoryProduct"
                value={productForm.category}
                onChange={(e) => changeHandler(e)}>
                {categories &&
                  categories.map((category) => (
                    <option value={category._id}>{category.name}</option>
                  ))}
              </select>
            </label>
            <label htmlFor="" className="admin-form__label">
              ???????????????????? ?? ??????????????:
              <input
                type="number"
                className="admin-form__input"
                name="product/countInStock"
                value={productForm.countInStock}
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <button type="submit" onClick={productFromSubmitHandler}>
              ????????????????
            </button>
          </form>
        </div>
        <div className="">
          <h2>???????????????? ??????????????????</h2>
          <form action="">
            <label htmlFor="" className="admin-form__label">
              ???????????????? ??????????????????:
              <input
                type="name"
                name="category/name"
                value={categoryForm.name}
                onChange={(e) => changeHandler(e)}
                required
              />
            </label>
            <label htmlFor="" className="admin-form__label">
              ?????? ???????????? ???????? ??????????????????:
              <select
                className="admin-form__select"
                name="category/gender"
                value={categoryForm.gender}
                onChange={(e) => changeHandler(e)}>
                <option value="men">??????????????</option>
                <option value="women">??????????????</option>
              </select>
            </label>
            <button type="submit" onClick={categoryFromSubmitHandler}>
              ????????????????
            </button>
          </form>
        </div>
        <form className="">
          <h2>???????????? ???????????????????????? ????????</h2>
          <label htmlFor="" className="admin-form__label">
            ?????? ?????? ?????????? ???????????????????????? ID: {updateUserRoleForm.id}
            <input
              type="text"
              name="updateRole/name"
              value={updateUserRoleForm.name}
              onChange={(e) => changeHandler(e)}
            />
          </label>
          <button onClick={(e) => findUser(e)}>??????????</button>
          <label htmlFor="" className="admin-form__label">
            ????????
            <select
              className="admin-form__select"
              name="updateRole/role"
              id=""
              onChange={(e) => changeHandler(e)}>
              <option value="customer">????????????????????</option>
              <option value="admin">??????????</option>
            </select>
          </label>
          <button type="submit" onClick={roleFormSubmitHandler}>
            ????????????????
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminPage
