import {
  GET_ORDERS,
  GET_ORDER_DETAIL,
  ORDER_LOADING,
  GET_PARENT_ORDER,
  RETURN_ORDER
} from "../actions/types";

const initialState = {
  orders: [],
  selected_order: {},
  order_loading: true,
  parent_order: {}
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
        selected_order: action.payload,
        order_loading: false
      };

    case GET_PARENT_ORDER:
      let temp_order = {};

      action.payload.api_res.children_orders.map(single_children_order =>
        single_children_order.order_id === action.payload.child_order_id
          ? (temp_order = single_children_order)
          : ""
      );

      return {
        ...state,
        selected_order: temp_order,
        parent_order: action.payload.api_res,
        order_loading: false
      };

    case RETURN_ORDER:
      return {
        ...state,
        selected_order: {
          ...state.selected_order,
          delivery_status: "Return requested"
        }
      };

    default:
      return state;
  }
}
