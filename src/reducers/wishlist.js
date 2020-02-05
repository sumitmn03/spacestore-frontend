import {
  GET_WISHLIST,
  DELETE_FROM_WL,
  ADD_TO_WISHLIST
} from "../actions/types";

const initialState = {
  wishlist: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload
      };

    case DELETE_FROM_WL:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          wl_item => wl_item.id !== action.payload
        )
      };

    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [action.payload, ...state.wishlist]
      };

    default:
      return state;
  }
}
