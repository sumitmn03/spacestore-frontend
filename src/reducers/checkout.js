import {
  SET_CHECKOUT,
  REMOVE_ITEM_FROM_CHECKOUT,
  REMOVE_SINGLE_CHECKOUT_ITEM,
  DELETE_ADDRESS,
  PLACE_ORDER
} from "../actions/types";

const initialState = {
  checkout: { checkout_datas: null },
  checkout_success: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CHECKOUT:
      if (action.payload.cart_or_single === "single") {
        return {
          ...state,
          checkout: {
            ...action.payload,
            checkout_datas: [
              { id: 0, cart_product: action.payload.checkout_datas[0] }
            ]
          }
        };
      } else if (action.payload.cart_or_single === "cart") {
        return {
          ...state,
          checkout: action.payload
        };
      } else {
        return {
          ...state
        };
      }

    case REMOVE_ITEM_FROM_CHECKOUT:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          checkout_datas: state.checkout.checkout_datas.filter(
            single_cart_data => single_cart_data.id !== action.payload
          )
        }
      };

    case REMOVE_SINGLE_CHECKOUT_ITEM:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          checkout_datas: []
        }
      };

    case DELETE_ADDRESS:
      if (state.checkout.address_data.id === action.payload) {
        return {
          ...state,
          checkout: {
            ...state.checkout,
            address_data: {}
          }
        };
      } else {
        return {
          ...state
        };
      }

    case PLACE_ORDER:
      return {
        ...state,
        checkout_success: true
      };

    default:
      return state;
  }
}
