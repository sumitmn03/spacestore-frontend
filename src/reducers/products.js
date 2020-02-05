import {
  GET_PRODUCTS,
  GET_EDITABLE_PRODUCTS,
  SET_QUERIES,
  SET_ORDER_BY,
  SET_NEXT_LINK,
  GET_PRODUCTS_SCROLLER
} from "../actions/types";

const initialState = {
  products: [],
  editable_products: [],
  order_by: "-rating",
  queries: {},
  next: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NEXT_LINK:
      return {
        ...state,
        products: [],
        next: action.payload
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload.results],
        next: action.payload.next
      };

    case GET_PRODUCTS_SCROLLER:
      return {
        ...state,
        products: [...state.products, ...action.payload.results],
        next: action.payload.next
      };

    case GET_EDITABLE_PRODUCTS:
      return {
        ...state,
        editable_products: action.payload
      };

    case SET_QUERIES:
      return {
        ...state,
        queries: { ...action.payload }
      };

    case SET_ORDER_BY:
      return {
        ...state,
        order_by: action.payload
      };

    default:
      return state;
  }
}
