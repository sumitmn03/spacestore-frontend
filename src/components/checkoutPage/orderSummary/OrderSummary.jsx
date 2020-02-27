import React, { Component, Fragment } from "react";
import SingleOrderSummary from "./SingleOrderSummary";

export class OrderSummary extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      checkout,
      handlePrevNextBtn,
      removeItemFromCheckout,
      removeSingleCheckoutItem,
      user
    } = this.props;

    let checkout_total_amt = 0;
    let shipping_charges = 50;

    return (
      <div>
        <div className="ms-checkout-order-sum-main">
          <div className="ms-checkout-order-sum-main-header">ORDER SUMMARY</div>
          <div className="ms-checkout-order-sum-main-body">
            {checkout.checkout_datas ? (
              checkout.checkout_datas.map(single_cart_data => {
                checkout_total_amt +=
                  single_cart_data.cart_product.current_price;

                return (
                  <SingleOrderSummary
                    key={single_cart_data.id}
                    single_cart_data={single_cart_data}
                    removeItemFromCheckout={removeItemFromCheckout}
                    removeSingleCheckoutItem={removeSingleCheckoutItem}
                    checkout={checkout}
                    user={user}
                  />
                );
              })
            ) : (
              <Fragment />
            )}
          </div>
          <div className="ms-checkout-order-sum-btn-container">
            <button
              className="ms-checkout-footer-nav-btn first"
              onClick={() => handlePrevNextBtn(1, "prev")}
            >
              Prev
            </button>
            <button
              className="ms-checkout-footer-nav-btn"
              onClick={() => handlePrevNextBtn(1, "next")}
            >
              Continue
            </button>
          </div>
        </div>
        <div className="ms-checkout-order-summary-sidebar">
          <div className="ms-checkout-order-sum-main-header">PRICE DETAILS</div>
          <div className="ms-checkout-order-summary-sidebar-body">
            <div className="ms-checkout-order-summary-sidebar-payment">
              Products Price :
              <span className="ms-checkout-order-summary-sidebar-payment-amount">
                ₹{checkout_total_amt}
              </span>
            </div>

            <div className="ms-checkout-order-summary-sidebar-payment">
              Shipping charges :
              <span className="ms-checkout-order-summary-sidebar-payment-amount">
                ₹{shipping_charges}
              </span>
            </div>
            <div className="ms-checkout-order-summary-sidebar-total-amt-label ms-checkout-order-summary-sidebar-payment">
              Total :{" "}
              <span className="ms-checkout-order-summary-sidebar-total-amt">
                ₹{checkout_total_amt + shipping_charges}
              </span>
            </div>
          </div>
          <div className="ms-checkout-order-summary-sidebar-btn-container">
            <button
              className="ms-checkout-footer-nav-btn"
              onClick={() => handlePrevNextBtn(1, "next")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSummary;
