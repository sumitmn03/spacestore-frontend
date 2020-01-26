import { combineReducers } from "redux";
import products from "./products";
import auth from "./auth";
import logNReg from "./logNReg";
import orders from "./orders";
import cart from "./cart";
import saved_for_later from "./saved_for_later";
import wishlist from "./wishlist";
import updateUser from "./updateUser";

export default combineReducers({
  products,
  auth,
  logNReg,
  orders,
  cart,
  saved_for_later,
  wishlist,
  updateUser
});

// proptypes

// optionalArray: PropTypes.array,
// optionalBool: PropTypes.bool,
// optionalFunc: PropTypes.func,
// optionalNumber: PropTypes.number,
// optionalObject: PropTypes.object,
// optionalString: PropTypes.string,
// optionalSymbol: PropTypes.symbol,
