import React, { Component, Fragment } from "react";

export class SelectedAddress extends Component {
  render() {
    const { current_address, handlePrevNextBtn } = this.props;

    return (
      <div className="ms-checkout-selected-address-container">
        <div className="ms-checkout-selected-address-header">
          Delivery address
        </div>
        <div className="ms-checkout-selected-address-body">
          {current_address && current_address.name ? (
            <Fragment>
              <div className="ms-address-single-address-container">
                <div className="ms-address-single-address">
                  <div>{current_address.name}</div>
                  <div>{current_address.address}</div>
                  <div>{current_address.locality}</div>
                  <div>{current_address.landmark}</div>
                  <div>{current_address.city}</div>
                  <div>{current_address.state}</div>
                  <div>{current_address.country}</div>
                  <div>{current_address.pin_code}</div>
                  <div>Alternate phone no.- {current_address.alt_phone}</div>
                </div>
              </div>
              <div className="ms-checkout-footer-nav-btn-container">
                {/* <button className="ms-checkout-footer-nav-btn first">
                  Prev
                </button> */}
                <button
                  className="ms-checkout-footer-nav-btn"
                  onClick={() => handlePrevNextBtn(0, "next")}
                >
                  Continue
                </button>
              </div>
            </Fragment>
          ) : (
            <div>Select a delivery address from the list below</div>
          )}
        </div>
      </div>
    );
  }
}

export default SelectedAddress;
