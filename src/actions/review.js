import axios from "axios";

import { GET_PRODUCT_REVIEWS, ADD_PRODUCT_REVIEW } from "./types";

import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

export const getProductReviews = id => dispatch => {
  axios
    .get(`http://localhost:8000/api/getproductreview/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCT_REVIEWS,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err));
};

export const postProductReview = data => (dispatch, getState) => {
  axios
    .post(
      "http://localhost:8000/api/mainproductreview",
      JSON.stringify(data),
      tokenConfig(getState)
    )
    .then(res => {
      if (res.data.already_exists) {
        dispatch(createMessage({ error: "You have already posted a review" }));
      }
      dispatch({ type: ADD_PRODUCT_REVIEW, payload: res.data });
    })
    .catch(err => console.log("error", err));
};
