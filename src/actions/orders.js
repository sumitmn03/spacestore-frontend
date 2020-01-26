import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_ORDERS, GET_ORDER_DETAIL, ORDER_LOADING } from "./types";

export const getOrders = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/orders", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err.message));
};

export const getOrderDetail = order_id => (dispatch, getState) => {
  dispatch({ type: ORDER_LOADING });
  axios
    .get(
      `http://localhost:8000/api/orderdetail/${order_id}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: GET_ORDER_DETAIL,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err.message));
};
