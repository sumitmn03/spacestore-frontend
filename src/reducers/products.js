import {
  GET_PRODUCTS,
  GET_EDITABLE_PRODUCTS,
  GET_HOME_EDITABLE_PRODUCTS
} from "../actions/types";

const initialState = {
  products: [],
  editable_products: [],
  home_editable_products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case GET_EDITABLE_PRODUCTS:
      return {
        ...state,
        editable_products: action.payload
      };

    case GET_HOME_EDITABLE_PRODUCTS:
      return {
        ...state,
        home_editable_products: action.payload
      };

    default:
      return state;
  }
}
