import axios from 'axios';
import {
  GET_CART_ITEMS,
  ON_SUCCESS_BUY,
  REMOVE_CART_ITEM,
  SET_CART_ITEM,
  SET_UPDATED,
} from '../constants';
import { tokenConfig } from './auth';
import { returnErrors } from './error';

export const addCartItem = (userId, productId, currentSize) => (dispatch) => {
  dispatch(setUpdated(true));

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const productToCart = { _id: productId, size: currentSize };

  const body = JSON.stringify({ userId, productToCart });

  axios
    .post('http://localhost:5000/api/users/cartItems', body, config)
    .then(({ data }) => {
      dispatch(setCartItem(data));
    });
};

export const getCartItems = (cartItems, userCart) => (dispatch) => {
  axios
    .get(
      `http://localhost:5000/api/items/products/${'gender'}/products_by_id?id=${cartItems}&type=array`
    )
    .then(({ data }) => {
      userCart.forEach((cartItem) => {
        data.forEach((productDetail, i) => {
          if (cartItem._id === productDetail._id) {
            data[i].quantity = cartItem.quantity;
            data[i].size = cartItem.size;
          }
        });
      });

      dispatch(receiveCartItems(data));
    });
};

export const removeCartItem = (productId, userId) => (dispatch) => {
  dispatch(setUpdated(true));

  axios
    .get(
      `http://localhost:5000/api/users/removeFromCart?_id=${userId}&product=${productId}`
    )
    .then(({ data }) => {
      dispatch(removeCartItemUser(data));
    });
};

export const onSuccessBuy = (data) => (dispatch, getState) => {
  axios
    .post(
      `http://localhost:5000/api/users/successBuy`,
      data,
      tokenConfig(getState)
    )
    .then(({ data }) => dispatch(successBuy(data)))
    .catch((e) => dispatch(returnErrors(e.msg, e.status)));
};

const successBuy = (payload) => ({
  type: ON_SUCCESS_BUY,
  payload,
});

const removeCartItemUser = (payload) => ({
  type: REMOVE_CART_ITEM,
  payload,
});

const setUpdated = (payload) => ({
  type: SET_UPDATED,
  payload,
});

const setCartItem = (data) => ({
  type: SET_CART_ITEM,
  payload: data,
});

const receiveCartItems = (data) => ({
  type: GET_CART_ITEMS,
  payload: data,
});
