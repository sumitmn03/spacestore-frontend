import { GET_PRODUCT_REVIEWS, ADD_PRODUCT_REVIEW } from "../actions/types";

const initialState = {
  product: { reviews: [] },
  product_review_status: "no_review"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        product: action.payload
      };

    case ADD_PRODUCT_REVIEW:
      if (action.payload.review) {
        return {
          ...state,
          product: {
            ...state.product,
            reviews: [action.payload.review, ...state.product.reviews]
          },
          product_review_status: "just_now_added"
        };
      } else if (action.payload.already_exists) {
        return {
          ...state,
          product_review_status: "already_exists"
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
