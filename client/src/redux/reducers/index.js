import { combineReducers } from 'redux'
import filters from './filters'
import { productReducer, productsReducer } from './products'

const rootReducer = combineReducers({
  products: productsReducer,
  currentProduct: productReducer,
  filters: filters,
})

export default rootReducer
