import axios from "axios";

import {
  GET_PRODUCTS,
  GET_EDITABLE_PRODUCTS,
  SET_QUERIES,
  SET_ORDER_BY,
  SET_NEXT_LINK,
  GET_PRODUCTS_SCROLLER
} from "./types";

// It is the main functions to get products, it will be used in search, filters and link
export const searchProducts = (
  order_by = "-rating",
  search_query = "",
  type_query = "",
  color_query = "",
  design_type_query = "",
  size_query = ""
) => dispatch => {
  dispatch({
    type: SET_QUERIES,
    payload: {
      search_query,
      type_query,
      color_query,
      design_type_query,
      size_query
    }
  });

  dispatch({
    type: SET_ORDER_BY,
    payload: order_by
  });

  axios
    .get(
      `http://localhost:8000/api/searchproducts/${order_by}/ ${search_query}/ ${type_query}/ ${color_query}/ ${design_type_query}/ ${size_query}/`
    )
    .then(res => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err));
};

// it sets the next link for the infinite scroller so that it call the function getMoreProducts
export const setNextLink = (
  order_by = "-rating",
  search_query = "",
  type_query = "",
  color_query = "",
  design_type_query = "",
  size_query = ""
) => dispatch => {
  dispatch({
    type: SET_QUERIES,
    payload: {
      search_query,
      type_query,
      color_query,
      design_type_query,
      size_query
    }
  });

  dispatch({
    type: SET_ORDER_BY,
    payload: order_by
  });

  let next_link = `http://localhost:8000/api/searchproducts/${order_by}/ ${search_query}/ ${type_query}/ ${color_query}/ ${design_type_query}/ ${size_query}/`;
  dispatch({
    type: SET_NEXT_LINK,
    payload: next_link
  });
};

// it is used to get new datas in infinite scroller
export const getMoreProducts = next_link => dispatch => {
  axios
    .get(next_link)
    .then(res => {
      dispatch({
        type: GET_PRODUCTS_SCROLLER,
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
