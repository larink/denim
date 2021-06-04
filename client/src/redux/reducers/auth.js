import {
  AUTH_ERROR,
  GET_CART_ITEMS,
  GET_USER_ORDERS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  ON_SUCCESS_BUY,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REMOVE_CART_ITEM,
  SET_CART_ITEM,
  USER_LOADED,
  USER_LOADING,
} from '../constants'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token')
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      }
    case SET_CART_ITEM:
      return {
        ...state,
        user: {
          ...state.user,
          cartItems: action.payload,
        },
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        user: {
          ...state.user,
          cartItems: action.payload.cart,
        },
      }
    case GET_CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload,
      }
    case ON_SUCCESS_BUY:
      return {
        ...state,
        user: {
          ...state.user,
          cartItems: action.payload.cartItems,
        },
        cartDetail: action.payload.cartDetail,
      }
    case GET_USER_ORDERS:
      return {
        ...state,
        user: {
          ...state.user,
          orders: action.payload,
        },
      }
    default:
      return state
  }
}

export default auth
