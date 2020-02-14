import React, { Component } from "react";
import { Link } from "react-router-dom";

export class CheckoutSuccess extends Component {
  render() {
    return (
      <div className="ms-checkout-success-page">
        <div className="ms-checkout-success-page-thank-you">Thank you !</div>
        <div className="ms-checkout-success-page-body">
          Your order 123 has been placed. We have also sent you an email
          confirmation. You can check your order status any time from your order
          section.
        </div>
        <div className="ms-checkout-success-page-button-container">
          <Link to="/orders">
            <button className="ms-checkout-success-page-button first">
              View orders
            </button>
          </Link>
          <Link to="/">
            <button className="ms-checkout-success-page-button">Home</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CheckoutSuccess;
