import axios from 'axios'
import { CURRENT_PRODUCT, REMOVE_CURRENT_PRODUCT, SET_ITEMS } from '../constants'

export const fetchItems = (sortBy) => async (dispatch) => {
  await axios
    .get(`http://localhost:3001/products?_sort=${sortBy.type}&_order=${sortBy.order}`)
    .then(({ data }) => {
      dispatch(setItems(data))
    })
}

export const fetchItem = (id) => async (dispatch) => {
  await axios.get(`http://localhost:3001/products?_id=${id}`).then(({ data }) => {
    dispatch(currentProduct(data))
  })
  dispatch(setLoaded(false))
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
  type: 'SET_LOADED',
  payload,
})
