import axios from 'axios'
import { API } from '../api'
import {
  CURRENT_PRODUCT,
  REMOVE_CURRENT_PRODUCT,
  SET_CATEGORIES,
  SET_ITEMS,
  SET_LOADED,
  SET_SEARCHED_ITEMS,
  SET_CATEGORY,
  REMOVE_CATEGORY,
} from '../constants'

export const fetchItems =
  (sortBy, gender, page, categoryId, size, minPrice, maxPrice, brand) => async (dispatch) => {
    let category = categoryId ? `&category=${categoryId}` : ''
    let brandQuery = brand ? `&brand=${brand}` : ''
    let choosenSize = size ? `&size=${size}` : ''
    await axios
      // .get(`http://localhost:3001/products?_sort=${sortBy.type}&_order=${sortBy.order}`)
      .get(
        `http://localhost:5000/api/items/${gender}?page=${page}${category}&sort=${sortBy}${choosenSize}&price=${
          minPrice || 0
        }<${maxPrice || 99999}${brandQuery}`,
      )
      .then(({ data }) => {
        dispatch(setItems(data))
      })
      .catch((err) => {
        console.log(err)
      })
  }

export const getItems = () => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/api/items`)
    .then(({ data }) => {
      dispatch(setItems(data))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const fetchItem = (id, currentSize) => async (dispatch) => {
  await axios
    .get(`${API}/items/product/${id}`)
    .then(({ data }) => {
      // console.log(data)
      const item = { ...data, choosenSize: currentSize }
      dispatch(currentProduct(item))
    })
    .catch((err) => {
      console.log(err)
    })
  dispatch(setLoaded(false))
}

export const updateProduct = (gender, body) => (dispatch) => {
  console.log(body.id)
  axios.put(`${API}/items/${gender}/${body.id}`, body).then(({ data }) => {
    console.log('Product updated', data)
  })
}

export const createProduct = (body) => (dispatch) => {
  axios.post(`${API}/items`, body).then(({ data }) => {
    console.log('Product created', data)
  })
}

export const createCategory = (body) => (dispatch) => {
  axios.post(`http://localhost:5000/api/categories`, body).then(({ data }) => {
    console.log('Category created', data)
  })
}

export const getCategories = (gender) => (dispatch) => {
  axios.get(`http://localhost:5000/api/categories/${gender}`).then(({ data }) => {
    dispatch(setCategories(data))
  })
}

export const getCategory = (gender, id) => (dispatch) => {
  let idQuery = id ? `?id=${id}` : ''

  axios.get(`http://localhost:5000/api/categories/${gender}${idQuery}`).then(({ data }) => {
    dispatch(setCategory(data))
  })
}

export const fetchItemsBySearch = (searchQuery, gender) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/api/items/search?q=${searchQuery || 'none'}&gender=${gender}`)
    .then(({ data }) => {
      dispatch(setSerachedItems(data))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
})

export const currentProduct = (product) => ({
  type: CURRENT_PRODUCT,
  payload: product,
})

export const removeCurrentProduct = () => ({
  type: REMOVE_CURRENT_PRODUCT,
})
export const removeCategory = () => ({
  type: REMOVE_CATEGORY,
})

export const setLoaded = (payload) => ({
  type: SET_LOADED,
  payload,
})

export const setSerachedItems = (payload) => ({
  type: SET_SEARCHED_ITEMS,
  payload,
})

export const setCategories = (payload) => ({
  type: SET_CATEGORIES,
  payload,
})

export const setCategory = (payload) => ({
  type: SET_CATEGORY,
  payload,
})
