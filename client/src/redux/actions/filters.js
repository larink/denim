import { SET_GENDER_STATE, SET_SORT_BY } from '../constants'

export const setGenderState = (name) => ({
  type: SET_GENDER_STATE,
  payload: name,
})

export const setSortBy = (name) => ({
  type: SET_SORT_BY,
  payload: name,
})
