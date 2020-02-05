import axios from "axios";

import {
  GET_ADDRESSES,
  ADD_ADDRESS_STATUS,
  DELETE_ADDRESS,
  NEW_ADDRESS_ADDED,
  UPDATE_ADDRESS,
  SELECTED_ADDRESS
} from "./types";
import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

export const getAddresses = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/addresses", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ADDRESSES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(createMessage({ error: "Oops ! server error" }));
      dispatch(createMessage({ error: "please try again afer sometime" }));
    });
};

export const setAddAddressStatus = status => (dispatch, getState) => {
  dispatch({
    type: ADD_ADDRESS_STATUS,
    payload: status
  });
};

export const addNewAddress = data => (dispatch, getState) => {
  dispatch(setAddAddressStatus("loading"));
  axios
    .post(
      "http://localhost:8000/api/addresses/",
      JSON.stringify(data),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: NEW_ADDRESS_ADDED,
        payload: res.data
      });
      dispatch(setAddAddressStatus("success"));
    })
    .catch(err => {
      dispatch(createMessage({ error: "Failed to add the address" }));
      dispatch(setAddAddressStatus("fail"));
    });
};

export const deleteAddress = id => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/addresses/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_ADDRESS,
        payload: id
      });
    })
    .catch(err => {
      dispatch(createMessage({ error: "Deletion failed" }));
      dispatch(createMessage({ error: "please try again afer sometime" }));
    });
};

export const updateAddress = (id, data) => (dispatch, getState) => {
  dispatch(setAddAddressStatus("loading"));
  axios
    .put(
      `http://localhost:8000/api/addresses/${id}/`,
      JSON.stringify(data),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(setAddAddressStatus("success"));
      dispatch({
        type: UPDATE_ADDRESS,
        payload: { id, address: res.data }
      });
    })
    .catch(err => {
      dispatch(createMessage({ error: "Failed to add the address" }));
      dispatch(setAddAddressStatus("fail"));
    });
};

export const setSelectedAddress = address => (dispatch, getState) => {
  dispatch({
    type: SELECTED_ADDRESS,
    payload: address
  });
};
