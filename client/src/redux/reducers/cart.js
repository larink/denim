import { SET_CART_ITEM, SET_UPDATED } from '../constants'

const initialState = {
  userId: '',
  cartItems: [],
  isUpdating: false,
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_ITEM:
      const items = [...state.cartItems, action.payload]

      return {
        ...state,
        cartItems: items,
        isUpdating: false,
      }
    case SET_UPDATED:
      return {
        ...state,
        isUpdating: action.payload,
      }
    default:
      return state
  }
}
