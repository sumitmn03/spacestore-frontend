import axios from "axios";

import {
  SET_CHECKOUT,
  REMOVE_ITEM_FROM_CHECKOUT,
  REMOVE_SINGLE_CHECKOUT_ITEM,
  PLACE_ORDER
} from "./types";
import { tokenConfig } from "./auth";
import { deleteFromCart } from "./cart";
import { createMessage } from "./messages";

export const getCheckout = checkout_id => (dispatch, getState) => {
  axios
    .get(
      `http://localhost:8000/api/checkout/${checkout_id}/`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: SET_CHECKOUT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(createMessage({ error: "checkout not found" }));
    });
};

export const updateCheckout = (checkout_id, data) => (dispatch, getState) => {
  axios
    .put(
      `http://localhost:8000/api/checkout/${checkout_id}/`,
      JSON.stringify(data),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(getCheckout(checkout_id));
    })
    .catch(err => {
      dispatch(createMessage({ error: "Server error" }));
      dispatch(createMessage({ error: "please try again" }));
    });
};

export const removeItemFromCheckout = cart_id => (dispatch, getState) => {
  dispatch(deleteFromCart(cart_id));
  dispatch({
    type: REMOVE_ITEM_FROM_CHECKOUT,
    payload: cart_id
  });
};

export const removeSingleCheckoutItem = (checkout_id, data) => (
  dispatch,
  getState
) => {
  axios
    .put(
      `http://localhost:8000/api/checkout/${checkout_id}/`,
      JSON.stringify(data),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: REMOVE_SINGLE_CHECKOUT_ITEM
      });
    })
    .catch(err => {
      dispatch(createMessage({ error: "Server error" }));
      dispatch(createMessage({ error: "please try again" }));
    });
};

export const placeOrder = (
  checkout,
  product_id,
  size,
  quantity,
  address_id,
  original_price,
  seller_discount,
  shipping_charges
) => (dispatch, getState) => {
  let body = JSON.stringify({
    product: product_id,
    size,
    quantity,
    address: address_id,
    original_price,
    seller_discount,
    shipping_charges
  });
  axios
    .post(`http://localhost:8000/api/post_order/`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: PLACE_ORDER
      });

      dispatch(
        updateCheckout(checkout.id, {
          user: checkout.user,
          cart_or_single: null,
          product: null,
          payment_mode: null
        })
      );
    })
    .catch(err => {
      dispatch(createMessage({ error: "Server error" }));
      dispatch(createMessage({ error: "please try again" }));
    });
};
