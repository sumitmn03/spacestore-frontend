import axios from "axios";

import { CAROUSEL_ACTIVE, GET_HOME_PRODUCTS } from "./types";

export const getHomeProducts = next_link => dispatch => {
  axios
    .get(next_link)
    .then(res => {
      dispatch({
        type: GET_HOME_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => console.log("error", err));
};

export const activate_carousel = () => dispatch => {
  dispatch({
    type: CAROUSEL_ACTIVE
  });
};
