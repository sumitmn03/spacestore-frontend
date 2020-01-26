import axios from "axios";

import {
  GET_PRODUCTS,
  GET_EDITABLE_PRODUCTS,
  GET_HOME_EDITABLE_PRODUCTS
} from "./types";

export const getProducts = () => dispatch => {
  axios
    .get("http://localhost:8000/api/products/")
    .then(res => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err));
};

export const getHomeEditableProducts = () => dispatch => {
  axios
    .get("http://localhost:8000/api/homeeditableproducts/")
    .then(res => {
      dispatch({
        type: GET_HOME_EDITABLE_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err));
};

export const getEditableProducts = () => dispatch => {
  axios
    .get("http://localhost:8000/api/editableproducts/")
    .then(res => {
      dispatch({
        type: GET_EDITABLE_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err));
};
