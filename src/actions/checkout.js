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

// called in case of cart
export const removeItemFromCheckout = cart_id => (dispatch, getState) => {
  dispatch(deleteFromCart(cart_id));
  dispatch({
    type: REMOVE_ITEM_FROM_CHECKOUT,
    payload: cart_id
  });
};

// called in case of single item
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

export const placeOrder = checkout => (dispatch, getState) => {
  let body = [];
  checkout.checkout_datas.map(
    single_data =>
      (body = [
        ...body,
        {
          current_user: checkout.user,
          product: single_data.cart_product.id,
          size:
            checkout.cart_or_single === "single"
              ? checkout.size
              : single_data.size,
          quantity:
            checkout.cart_or_single === "single"
              ? checkout.quantity
              : single_data.quantity,
          address: checkout.address,
          original_price: single_data.cart_product.original_price,
          seller_discount: single_data.cart_product.seller_discount,
          shipping_charges: 40
        }
      ])
  );

  // console.log();

  axios
    .post(
      `http://localhost:8000/api/post_order/`,
      JSON.stringify(body),
      tokenConfig(getState)
    )
    .then(res => {
      // deleting all the current checkout data like cart_or_single and product as the order is success and the datas are of no use but the address_data is kept for future use by the user
      dispatch(
        updateCheckout(checkout.id, {
          user: checkout.user,
          cart_or_single: null,
          product: null,
          payment_mode: null,
          size: null,
          quantity: null
        })
      );

      // deleting from cart in case the order is made from cart
      if (checkout.cart_or_single === "cart") {
        dispatch(deleteAllCartItems(checkout.user));
      }

      // this will be used to redirect user to the success page
      dispatch({
        type: PLACE_ORDER
      });
    })
    .catch(err => console.log(err));
};

// called when the order is made from cart and the order is success
export const deleteAllCartItems = user_id => (dispatch, getState) => {
  axios
    .delete(
      `http://localhost:8000/api/delete_cart/${user_id}/`,
      tokenConfig(getState)
    )
    .catch(err => {
      dispatch(createMessage({ error: "Server error" }));
      dispatch(createMessage({ error: "please try again" }));
    });
};
