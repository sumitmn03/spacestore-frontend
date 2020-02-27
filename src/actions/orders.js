import axios from "axios";
import { tokenConfig } from "./auth";
import {
  GET_ORDERS,
  GET_ORDER_DETAIL,
  ORDER_LOADING,
  GET_PARENT_ORDER,
  RETURN_ORDER
} from "./types";
import { createMessage } from "./messages";

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

// it is used to update the datas of an order
export const updateOrder = (order_id, datas) => (dispatch, getState) => {
  axios
    .put(
      `http://localhost:8000/api/post_order/${order_id}/`,
      JSON.stringify(datas),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ success: "Order cancelled" }));
      dispatch({ type: RETURN_ORDER });
    })
    .catch(err => {
      dispatch(
        createMessage({ error: "Update err Please try after sometime" })
      );
    });
};

// it is used to create return reason
export const cancelOrder = (order, reason, update_datas) => (
  dispatch,
  getState
) => {
  console.log(JSON.stringify({ order, reason }));

  axios
    .post(
      "http://localhost:8000/api/return_reason/",
      JSON.stringify({ order, reason }),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(updateOrder(order, update_datas));
    })
    .catch(err => {
      console.log(err);

      dispatch(
        createMessage({ error: "Cancel err Please try after sometime" })
      );
    });
};
