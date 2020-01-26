import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART } from "./types";

export const getCart = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/cart", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CART,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err.message));
};

export const addToCart = product => (dispatch, getState) => {
  axios
    .post(
      `http://localhost:8000/api/cart/`,
      JSON.stringify({ product }),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: ADD_TO_CART,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err.message));
};

export const deleteFromCart = id => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/cart/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_FROM_CART,
        payload: id
      });
    })
    .catch(err => console.log("error", err.message));
};
