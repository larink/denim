import axios from 'axios'
import {
  CURRENT_PRODUCT,
  REMOVE_CURRENT_PRODUCT,
  SET_CATEGORIES,
  SET_ITEMS,
  SET_LOADED,
  SET_SEARCHED_ITEMS,
} from '../constants'

export const fetchItems =
  (sortBy, gender, page, categoryId, minPrice, maxPrice) => async (dispatch) => {
    let category = categoryId ? `&category=${categoryId}` : ''

    await axios
      // .get(`http://localhost:3001/products?_sort=${sortBy.type}&_order=${sortBy.order}`)
      .get(
        `http://localhost:5000/api/items/${gender}?page=${page}${category}&sort=${sortBy}&price=${
          minPrice || 0
        }<${maxPrice || 99999}`,
      )
      .then(({ data }) => {
        dispatch(setItems(data))
      })
      .catch((err) => {
        console.log(err)
      })
  }

export const fetchItem = (id, currentSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/api/items/product/${id}`)
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

export const getCategories = () => (dispatch) => {
  axios.get(`http://localhost:5000/api/categories`).then(({ data }) => {
    dispatch(setCategories(data))
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
