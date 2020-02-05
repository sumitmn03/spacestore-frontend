import { GET_PRODUCT_QNAS, ADD_PRODUCT_QNA } from "../actions/types";

const initialState = {
  product: { q_n_as: [] },
  product_qna_status: "no_qna"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_QNAS:
      return {
        ...state,
        product: action.payload
      };

    case ADD_PRODUCT_QNA:
      if (action.payload.question) {
        return {
          ...state,
          product_qna_status: "just_now_added"
        };
      } else if (action.payload.limit_crossed) {
        return {
          ...state,
          product_qna_status: "limit_crossed"
        };
      } else {
        return {
          ...state
        };
      }

    default:
      return state;
  }
}
