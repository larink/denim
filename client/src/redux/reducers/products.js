import {
  CURRENT_PRODUCT,
  REMOVE_CURRENT_PRODUCT,
  SET_CATEGORIES,
  SET_CATEGORY,
  SET_ITEMS,
  SET_LOADED,
  SET_SEARCHED_ITEMS,
  REMOVE_CATEGORY,
} from '../constants'

const initialState = {
  items: [],
  searchedItems: [],
  currentPage: 1,
  totalPages: 1,
  categories: [],
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload.items,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      }
    case SET_SEARCHED_ITEMS: {
      return {
        ...state,
        searchedItems: action.payload,
      }
    }
    case SET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      }
    }
    default:
      return state
  }
}

export const productReducer = (state = { product: {}, isLoaded: false, category: {} }, action) => {
  switch (action.type) {
    case CURRENT_PRODUCT:
      return { ...state, product: action.payload, isLoaded: true }
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      }
    case SET_LOADED:
      return { ...state, ...action.payload }
    case REMOVE_CURRENT_PRODUCT:
      return { ...state, product: {}, isLoaded: false }
    case REMOVE_CATEGORY:
      return { ...state, category: {} }
    default:
      return state
  }
}
