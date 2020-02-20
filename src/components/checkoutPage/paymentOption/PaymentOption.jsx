import React, { Component } from "react";

export class PaymentOption extends Component {
  state = {
    payment_mode: "",
    input_to_show: ""
  };

  handleRadio = e => this.setState({ payment_mode: e.target.value });

  render() {
    const payment_options = [
      "UPI",
      "Add Debit/Credit/ATM Card",
      "Net banking",
      "Cash on delivery"
    ];

    const { payment_mode } = this.state;

    const { checkout, placeOrder } = this.props;

    return (
      <div className="ms-checkout-payment-option-page">
        <div className="ms-checkout-payment-option-header">PAYMENT OPTIONS</div>
        <div className="ms-checkout-payment-option-body">
          {payment_options.map((payment_option, index) => (
            <div
              key={index}
              className="ms-checkout-payment-option-single-option"
            >
              <input
                className="ms-checkout-payment-option-single-option-radio"
                type="radio"
                name="payment_mode"
                value={payment_option}
                id={`checkout_payment_option_${payment_option}`}
                onChange={this.handleRadio}
                checked={payment_mode === payment_option}
              />
              <label htmlFor={`checkout_payment_option_${payment_option}`}>
                {payment_option}
              </label>
              <button
                className="ms-checkout-payment-option-single-option-confirm"
                style={{
                  display:
                    payment_mode === payment_option ? "inline-block" : "none"
                }}
                onClick={() => placeOrder(checkout)}
              >
                Place order
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PaymentOption;
