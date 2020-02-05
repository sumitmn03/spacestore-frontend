import axios from "axios";

import { GET_PRODUCT_QNAS, ADD_PRODUCT_QNA } from "./types";

import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

export const getProductQnas = id => dispatch => {
  axios
    .get(`http://localhost:8000/api/getproductqna/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCT_QNAS,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err));
};

export const postProductQna = data => (dispatch, getState) => {
  axios
    .post(
      "http://localhost:8000/api/mainproductqna",
      JSON.stringify(data),
      tokenConfig(getState)
    )
    .then(res => {
      if (res.data.limit_crossed) {
        dispatch(
          createMessage({
            success: "You can post upto 5 questions on a single product"
          })
        );
      }
      dispatch({ type: ADD_PRODUCT_QNA, payload: res.data });
    })
    .catch(err => console.log("error", err));
};
