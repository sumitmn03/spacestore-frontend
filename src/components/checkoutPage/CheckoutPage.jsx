import React, { Component } from "react";
import CheckoutAddress from "./checkoutAddress/CheckoutAddress";
// import OrderSummary from "./OrderSummary";
// import PaymentOption from "./PaymentOption";

export class CheckoutPage extends Component {
  state = {
    checkout_component: "address"
  };

  findComponentToRender = () => {
    const { checkout_component } = this.state;
    let comp;
    switch (checkout_component) {
      case "address":
        comp = <CheckoutAddress />;
        break;

      default:
        comp = <CheckoutAddress />;
        break;
    }
    return comp;
  };

  render() {
    return (
      <div className="ms-checkout-page">
        <div className="ms-checkout-sidebar">
          <div className="ms-checkout-sidebar-component">DELIVERY ADDRESS</div>
          <div className="ms-checkout-sidebar-component">ORDER SUMMARY</div>
          <div className="ms-checkout-sidebar-component">PAYMENT OPTIONS</div>
        </div>
        <div className="ms-checkout-main">{this.findComponentToRender()}</div>
      </div>
    );
  }
}

export default CheckoutPage;
