import {
  GET_SAVED_FOR_LATER,
  DELETE_FROM_SFL,
  ADD_TO_SFL
} from "../actions/types";

const initialState = {
  saved_for_later: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SAVED_FOR_LATER:
      return {
        ...state,
        saved_for_later: action.payload
      };

    case DELETE_FROM_SFL:
      return {
        ...state,
        saved_for_later: state.saved_for_later.filter(
          sfl_item => sfl_item.id !== action.payload
        )
      };

    case ADD_TO_SFL:
      console.log(action.payload);

      return {
        ...state,
        saved_for_later: [
          action.payload,
          ...state.saved_for_later.filter(single_product =>
            action.payload.sfl_product.id === single_product.sfl_product.id &&
            action.payload.size === single_product.size
              ? false
              : true
          )
        ]
      };

    default:
      return state;
  }
}
