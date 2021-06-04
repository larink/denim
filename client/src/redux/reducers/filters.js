import { SET_GENDER_STATE, SET_SORT_BY } from '../constants'

const initialState = {
  sortBy: 'rating',
}

const appState = {
  gender: 'women',
}

export const filters = (state = initialState, action) => {
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

export const app = (state = appState, action) => {
  switch (action.type) {
    case SET_GENDER_STATE:
      return {
        ...state,
        gender: action.payload,
      }
    default:
      return state
  }
}
