import { SET_SORT_BY } from '../constants'

const initialState = {
  sortBy: { type: 'popular', order: 'desc' },
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      }
    default:
      return state
  }
}

export default filters
