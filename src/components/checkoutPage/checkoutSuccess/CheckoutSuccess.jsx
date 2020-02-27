import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetCheckout } from "../../../actions/checkout";

export class CheckoutSuccess extends Component {
  static propTypes = {
    resetCheckout: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.resetCheckout();
  }

  render() {
    return (
      <div className="ms-checkout-success-page">
        <div className="ms-checkout-success-page-thank-you">Thank You !</div>
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
            <button className="ms-checkout-success-page-button second">
              Home
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { resetCheckout })(CheckoutSuccess);
