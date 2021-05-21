import { CURRENT_PRODUCT, REMOVE_CURRENT_PRODUCT, SET_ITEMS, SET_LOADED } from '../constants'

const initialState = {
  items: [],
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      }
    default:
      return state
  }
}

export const productReducer = (state = { product: {}, isLoaded: false }, action) => {
  switch (action.type) {
    case CURRENT_PRODUCT:
      return { ...state, product: action.payload, isLoaded: true }
    case SET_LOADED:
      return { ...state, ...action.payload }
    case REMOVE_CURRENT_PRODUCT:
      return { ...state, product: {}, isLoaded: false }
    default:
      return state
  }
}
