import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_SAVED_FOR_LATER, DELETE_FROM_SFL, ADD_TO_SFL } from "./types";

export const getSavedForLater = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/savedforlater", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SAVED_FOR_LATER,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err.message));
};

export const addToSfl = product => (dispatch, getState) => {
  axios
    .post(
      `http://localhost:8000/api/savedforlater/`,
      JSON.stringify({ product }),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: ADD_TO_SFL,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err.message));
};

export const deleteFromSfl = id => (dispatch, getState) => {
  axios
    .delete(
      `http://localhost:8000/api/savedforlater/${id}/`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: DELETE_FROM_SFL,
        payload: id
      });
    })
    .catch(err => console.log("error", err.message));
};
