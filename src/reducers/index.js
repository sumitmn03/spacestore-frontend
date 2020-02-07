import { combineReducers } from "redux";
import messages from "./messages";
import products from "./products";
import auth from "./auth";
import logNReg from "./logNReg";
import orders from "./orders";
import cart from "./cart";
import saved_for_later from "./saved_for_later";
import wishlist from "./wishlist";
import updateUser from "./updateUser";
import home from "./home";
import product from "./product";
import review from "./review";
import qna from "./qna";
import address from "./address";
import checkout from "./checkout";

export default combineReducers({
  messages,
  products,
  auth,
  logNReg,
  orders,
  cart,
  saved_for_later,
  wishlist,
  updateUser,
  home,
  product,
  review,
  qna,
  address,
  checkout
});

// proptypes

// optionalArray: PropTypes.array,
// optionalBool: PropTypes.bool,
// optionalFunc: PropTypes.func,
// optionalNumber: PropTypes.number,
// optionalObject: PropTypes.object,
// optionalString: PropTypes.string,
// optionalSymbol: PropTypes.symbol,
