import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getAddresses,
  deleteAddress,
  addNewAddress,
  setAddAddressStatus,
  updateAddress
} from "../../actions/address";
import {
  getCheckout,
  updateCheckout,
  removeItemFromCheckout,
  removeSingleCheckoutItem,
  placeOrder
} from "../../actions/checkout";

import { createMessage } from "../../actions/messages";

import CheckoutAddress from "./checkoutAddress/CheckoutAddress";
import OrderSummary from "./orderSummary/OrderSummary";
import PaymentOption from "./paymentOption/PaymentOption";
import CheckoutSuccess from "./checkoutSuccess/CheckoutSuccess";

export class CheckoutPage extends Component {
  state = {
    checkout_component: "delivery_address"
  };

  static propTypes = {
    checkout: PropTypes.object.isRequired,
    getCheckout: PropTypes.func.isRequired,
    getAddresses: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    addresses: PropTypes.array.isRequired,
    addNewAddress: PropTypes.func.isRequired,
    setAddAddressStatus: PropTypes.func.isRequired,
    updateAddress: PropTypes.func.isRequired,
    address_status: PropTypes.string.isRequired,
    updateCheckout: PropTypes.func.isRequired,
    removeItemFromCheckout: PropTypes.func.isRequired,
    removeSingleCheckoutItem: PropTypes.func.isRequired,
    placeOrder: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    checkout_success: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.getCheckout(this.props.user.checkout_id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.checkout_success)
        this.props.history.push("/checkout_success");

      const checkout_datas = this.props.checkout.checkout_datas;
      if (checkout_datas) {
        if (checkout_datas.length < 1) this.props.history.push("/");
      }
    }
  }

  handlePrevNextBtn = (component_index, prev_or_next) => {
    let comps = ["delivery_address", "order_summary", "payment_options"];

    prev_or_next === "prev" ? component_index-- : component_index++;

    this.setState({ checkout_component: comps[component_index] });
  };

  findComponentToRender = () => {
    const { checkout_component } = this.state;
    const {
      getAddresses,
      checkout,
      addresses,
      deleteAddress,
      addNewAddress,
      setAddAddressStatus,
      address_status,
      updateAddress,
      updateCheckout,
      user,
      removeItemFromCheckout,
      removeSingleCheckoutItem,
      placeOrder
    } = this.props;

    let comp;
    switch (checkout_component) {
      case "delivery_address":
        comp = (
          <CheckoutAddress
            getAddresses={getAddresses}
            checkout={checkout}
            addresses={addresses}
            deleteAddress={deleteAddress}
            addNewAddress={addNewAddress}
            setAddAddressStatus={setAddAddressStatus}
            address_status={address_status}
            updateAddress={updateAddress}
            updateCheckout={updateCheckout}
            user={user}
            handlePrevNextBtn={this.handlePrevNextBtn}
          />
        );
        break;

      case "order_summary":
        comp = (
          <OrderSummary
            checkout={checkout}
            handlePrevNextBtn={this.handlePrevNextBtn}
            removeItemFromCheckout={removeItemFromCheckout}
            removeSingleCheckoutItem={removeSingleCheckoutItem}
            user={user}
          />
        );
        break;

      case "payment_options":
        comp = <PaymentOption checkout={checkout} placeOrder={placeOrder} />;
        break;

      default:
        comp = (
          <CheckoutAddress
            getAddresses={getAddresses}
            checkout={checkout}
            addresses={addresses}
            deleteAddress={deleteAddress}
            addNewAddress={addNewAddress}
            setAddAddressStatus={setAddAddressStatus}
            address_status={address_status}
            updateAddress={updateAddress}
            updateCheckout={updateCheckout}
            user={user}
            handlePrevNextBtn={this.handlePrevNextBtn}
          />
        );
        break;
    }
    return comp;
  };

  handleComponentToRender = checkout_component =>
    this.setState({ checkout_component });

  render() {
    return (
      <div className="ms-checkout-page">
        <div className="ms-checkout-sidebar">
          <div
            className="ms-checkout-sidebar-component"
            onClick={() => this.handleComponentToRender("delivery_address")}
          >
            DELIVERY ADDRESS
          </div>
          <div
            className="ms-checkout-sidebar-component"
            onClick={() => this.handleComponentToRender("order_summary")}
          >
            ORDER SUMMARY
          </div>
          <div
            className="ms-checkout-sidebar-component"
            onClick={() => this.handleComponentToRender("payment_options")}
          >
            PAYMENT OPTIONS
          </div>
        </div>
        <div className="ms-checkout-main">{this.findComponentToRender()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout.checkout,
  addresses: state.address.addresses,
  address_status: state.address.address_status,
  user: state.auth.user,
  checkout_success: state.checkout.checkout_success
});

export default connect(mapStateToProps, {
  getAddresses,
  deleteAddress,
  createMessage,
  addNewAddress,
  setAddAddressStatus,
  updateAddress,
  updateCheckout,
  getCheckout,
  removeItemFromCheckout,
  removeSingleCheckoutItem,
  placeOrder
})(CheckoutPage);
