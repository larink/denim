import { SET_SORT_BY } from '../constants'

export const setSortBy = (name) => ({
  type: SET_SORT_BY,
  payload: name,
})
