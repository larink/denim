import { combineReducers } from 'redux'
import auth from './auth'
import error from './error'
import { filters, app } from './filters'
import { productReducer, productsReducer } from './products'
import { cart } from './cart'

const rootReducer = combineReducers({
  app: app,
  products: productsReducer,
  cart,
  currentProduct: productReducer,
  filters: filters,
  error: error,
  auth: auth,
})

export default rootReducer
