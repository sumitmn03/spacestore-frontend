import { GET_SINGLE_PRODUCT } from "../actions/types";

const initialState = {
  product: {
    size_n_quantity: [],
    product_details: [],
    reviews: [],
    q_n_as: [],
    product_images: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.payload
      };

    default:
      return state;
  }
}
