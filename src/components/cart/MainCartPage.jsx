import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createMessage } from "../../actions/messages";
import { getCart, addToCart, deleteFromCart } from "../../actions/cart";
import {
  getSavedForLater,
  addToSfl,
  deleteFromSfl
} from "../../actions/saved_for_later";
import { updateCheckout } from "../../actions/checkout";
import SingleCartProductDetails from "./SingleCartProductDetails";
import SingleSavedForLaterProduct from "../savedForLater/SingleSavedForLaterProduct";

export class MainCartPage extends Component {
  static propTypes = {
    createMessage: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    deleteFromCart: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired,
    getSavedForLater: PropTypes.func.isRequired,
    addToSfl: PropTypes.func.isRequired,
    deleteFromSfl: PropTypes.func.isRequired,
    saved_for_later: PropTypes.array.isRequired,
    updateCheckout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getCart();
    this.props.getSavedForLater();
    window.scrollTo(0, 0);
  }

  render() {
    const {
      createMessage,
      cart,
      saved_for_later,
      addToCart,
      deleteFromCart,
      addToSfl,
      deleteFromSfl,
      updateCheckout,
      user
    } = this.props;
    let cart_total_amt = 0;
    let shipping_charges = 50;

    return (
      <div className="ms-cart-page">
        <div className="ms-cart-container">
          <div className="ms-cart-product-container">
            <div className="ms-cart-header">My Shopping Bag</div>
            {cart.length < 1 ? (
              <div className="ms-cart-no-product">
                Your shopping bag is empty !
              </div>
            ) : (
              <Fragment />
            )}
            {cart.map((cart_item, index) => {
              let product = cart_item.cart_product;
              cart_total_amt +=
                product.original_price - product.seller_discount;
              return (
                <SingleCartProductDetails
                  key={index}
                  product={product}
                  deleteFromCart={deleteFromCart}
                  addToSfl={addToSfl}
                  cart_id={cart_item.id}
                  cart_size={cart_item.size}
                  cart_quantity={cart_item.quantity}
                />
              );
            })}
            <div className="ms-cart-total-amt">
              <span> Total : ₹{cart_total_amt}</span>
            </div>
          </div>
          <div className="ms-cart-amount-container">
            <div className="ms-cart-order-payment-container">
              <div>
                <span className="ms-cart-order-payment">
                  Products Price :
                  <span className="ms-cart-order-payment-amount">
                    {cart_total_amt}
                  </span>
                </span>
              </div>
              <div>
                <span className="ms-cart-order-payment">
                  Shipping charges :
                  <span className="ms-cart-order-payment-amount">
                    ₹{shipping_charges}
                  </span>
                </span>
              </div>
            </div>
            <div className="ms-cart-order-total-amt-label">
              Total :{" "}
              <span className="ms-cart-order-total-amt">
                ₹{cart_total_amt + shipping_charges}/-
              </span>
            </div>
            <button
              className="ms-cart-order-btn"
              onClick={e => {
                if (cart.length < 1) {
                  createMessage({ error: "your cart is empty" });
                } else {
                  updateCheckout(user.checkout_id, {
                    user: user.id,
                    cart_or_single: "cart"
                  });
                  this.props.history.push("/checkout");
                }
              }}
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="ms-cart-container">
          <div className="ms-cart-product-container">
            <div className="ms-cart-header">Saved For Later</div>
            {saved_for_later.length < 1 ? (
              <div className="ms-cart-no-product">
                Your Saved for later list is empty !
              </div>
            ) : (
              <Fragment />
            )}
            {saved_for_later.map((sfl_item, index) => (
              <SingleSavedForLaterProduct
                key={index}
                product={sfl_item.sfl_product}
                deleteFromSfl={deleteFromSfl}
                addToCart={addToCart}
                sfl_id={sfl_item.id}
                sfl_size={sfl_item.size}
                sfl_quantity={sfl_item.quantity}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart,
  saved_for_later: state.saved_for_later.saved_for_later,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  getCart,
  createMessage,
  addToCart,
  deleteFromCart,
  getSavedForLater,
  addToSfl,
  deleteFromSfl,
  updateCheckout
})(MainCartPage);
