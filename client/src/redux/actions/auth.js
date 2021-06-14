import axios from 'axios';
import {
  AUTH_ERROR,
  GET_PAYMENTS,
  GET_USER_ORDERS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_USER_ADDRESS,
  USER_LOADED,
  USER_LOADING,
  UPDATE_USER,
  SEARCH_USER,
} from '../constants';
import { returnErrors } from './error';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get('http://localhost:5000/api/auth/user', tokenConfig(getState))
    .then(({ data }) => dispatch(setUserLoaded(data)))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const setUserLoaded = (user) => ({
  type: USER_LOADED,
  payload: user,
});

export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    axios
      .post('http://localhost:5000/api/auth/register', body, config)
      .then(({ data }) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    axios
      .post('http://localhost:5000/api/auth/login', body, config)
      .then(({ data }) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const getPayments = (page) => (dispatch, getState) => {
  axios
    .get(
      `http://localhost:5000/api/users/payments?page=${page}`,
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch(getAllPayments(data));
    });
};

export const setAddress = (address) => (dispatch, getState) => {
  axios
    .put(
      `http://localhost:5000/api/users/address`,
      address,
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    });
};

export const updateUser = (body) => (dispatch, getState) => {
  axios
    .put(`http://localhost:5000/api/auth/update`, body, tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    });
};

export const getUser = (name) => (dispatch, getState) => {
  axios
    .get(
      `http://localhost:5000/api/users/search?q=${name}`,
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({ type: SEARCH_USER, payload: data });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const getUserOrders = (payload) => ({
  type: GET_USER_ORDERS,
  payload,
});

export const getAllPayments = (payload) => ({
  type: GET_PAYMENTS,
  payload,
});

export const setUserAddress = (payload) => ({
  type: SET_USER_ADDRESS,
  payload,
});

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token !== null) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
