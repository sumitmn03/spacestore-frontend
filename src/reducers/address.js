import {
  ADD_ADDRESS_STATUS,
  GET_ADDRESSES,
  DELETE_ADDRESS,
  NEW_ADDRESS_ADDED,
  UPDATE_ADDRESS,
  SELECTED_ADDRESS
} from "../actions/types";

const initialState = {
  addresses: [],
  address_status: "",
  selected_address: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ADDRESS_STATUS:
      return {
        ...state,
        address_status: action.payload
      };

    case NEW_ADDRESS_ADDED:
      return {
        ...state,
        addresses: [action.payload, ...state.addresses]
      };

    case GET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload
      };

    case UPDATE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(address =>
          address.id === action.payload.id ? action.payload.address : address
        )
      };

    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(
          address => address.id !== action.payload
        )
      };

    case SELECTED_ADDRESS:
      return {
        ...state,
        selected_address: action.payload
      };

    default:
      return state;
  }
}
