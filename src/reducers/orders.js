import { GET_ORDERS, GET_ORDER_DETAIL, ORDER_LOADING } from "../actions/types";

const initialState = {
  orders: [],
  order: {},
  order_loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        order_loading: true
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };

    case GET_ORDER_DETAIL:
      return {
        ...state,
        order: action.payload,
        order_loading: false
      };

    default:
      return state;
  }
}
