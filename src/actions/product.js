import axios from "axios";
import { tokenConfig } from "./auth";

import { GET_SINGLE_PRODUCT } from "./types";

// it is used to get a single product
export const getSingleProduct = id => (dispatch, getState) => {
  axios
    .get(`http://localhost:8000/api/products/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SINGLE_PRODUCT,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err));
};
