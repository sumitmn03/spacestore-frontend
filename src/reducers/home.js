import { CAROUSEL_ACTIVE, GET_HOME_PRODUCTS } from "../actions/types";

const initialState = {
  carousel_is_active: false,
  carousel_products: [],
  products: [],
  product_categories: [],
  next: "http://localhost:8000/api/homepage"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CAROUSEL_ACTIVE:
      return {
        ...state,
        carousel_is_active: true
      };

    case GET_HOME_PRODUCTS:
      if (action.payload.results[0].category === "carousel") {
        return {
          ...state,
          carousel_products: [...action.payload.results],
          next: action.payload.next
        };
      } else if (
        state.product_categories.includes(action.payload.results[0].category)
      ) {
        return state;
      } else {
        return {
          ...state,
          products: [...state.products, [...action.payload.results]],
          product_categories: [
            ...state.product_categories,
            action.payload.results[0].category
          ],
          next: action.payload.next
        };
      }

    default:
      return state;
  }
}
