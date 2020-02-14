import axios from "axios";
import { tokenConfig } from "./auth";
import {
  GET_ORDERS,
  GET_ORDER_DETAIL,
  ORDER_LOADING,
  GET_PARENT_ORDER
} from "./types";

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
    .get(`http://localhost:8000/api/orders/${order_id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ORDER_DETAIL,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err.message));
};

export const getParentOrder = (parent_order_id, child_order_id) => (
  dispatch,
  getState
) => {

  dispatch({ type: ORDER_LOADING });
  axios
    .get(
      `http://localhost:8000/api/parent_orders/${parent_order_id}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: GET_PARENT_ORDER,
        payload: { api_res: res.data, child_order_id }
      });
    })
    .catch(err => console.log("error", err.message));
};
