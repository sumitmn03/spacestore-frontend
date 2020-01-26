import { GET_CART, DELETE_FROM_CART, ADD_TO_CART } from "../actions/types";

const initialState = {
  cart: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(cart_item => cart_item.id !== action.payload)
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [action.payload, ...state.cart]
      };

    default:
      return state;
  }
}
