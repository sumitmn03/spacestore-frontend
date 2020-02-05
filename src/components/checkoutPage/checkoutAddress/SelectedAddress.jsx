import React, { Component } from "react";

export class SelectedAddress extends Component {
  render() {
    const { selected_address } = this.props;

    return (
      <div className="ms-checkout-selected-address-container">
        <div className="ms-checkout-selected-address-header">
          Delivery address
        </div>
        <div className="ms-checkout-selected-address-body">
          {selected_address.name ? (
            <div className="ms-address-single-address-container">
              <div className="ms-address-single-address">
                <div>{selected_address.name}</div>
                <div>{selected_address.address}</div>
                <div>{selected_address.locality}</div>
                <div>{selected_address.landmark}</div>
                <div>{selected_address.city}</div>
                <div>{selected_address.state}</div>
                <div>{selected_address.country}</div>
                <div>{selected_address.pin_code}</div>
                <div>Alternate phone no.- {selected_address.alt_phone}</div>
              </div>
            </div>
          ) : (
            <div>Select a delivery address from the list below</div>
          )}
        </div>
      </div>
    );
  }
}

export default SelectedAddress;
