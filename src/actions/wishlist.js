import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_WISHLIST, ADD_TO_WISHLIST, DELETE_FROM_WL } from "./types";

export const getWishlist = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/wishlist", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_WISHLIST,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err.message));
};

export const addToWishlist = product => (dispatch, getState) => {
  axios
    .post(
      "http://localhost:8000/api/wishlist/",
      JSON.stringify({ product }),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: ADD_TO_WISHLIST,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err.message));
};

export const deleteFromWl = id => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/wishlist/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_FROM_WL,
        payload: id
      });
    })
    .catch(err => console.log("error", err.message));
};
