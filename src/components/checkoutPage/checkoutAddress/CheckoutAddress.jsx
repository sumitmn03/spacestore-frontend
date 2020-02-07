import React, { Component } from "react";
import AddNewAddress from "../../address/AddNewAddress";
import UpdateOldAddress from "../../address/UpdateOldAddress";
import SelectedAddress from "./SelectedAddress";

export class CheckoutAddress extends Component {
  state = {
    show_add_address_comp: false,
    edit_address: ""
  };

  componentDidMount() {
    this.props.getAddresses();
    window.scrollTo(0, 0);
  }

  toggleAddAddress = show_add_address_comp =>
    this.setState({ show_add_address_comp, edit_address: "" });

  handleCompToEdit = index =>
    this.setState({ show_add_address_comp: false, edit_address: index });

  render() {
    const {
      checkout,
      addresses,
      // createMessage,
      deleteAddress,
      addNewAddress,
      setAddAddressStatus,
      address_status,
      updateAddress,
      updateCheckout,
      user,
      handlePrevNextBtn
    } = this.props;

    const { show_add_address_comp, edit_address } = this.state;

    return (
      <div>
        <SelectedAddress
          current_address={checkout.address_data}
          handlePrevNextBtn={handlePrevNextBtn}
        />
        <div className="ms-address-page">
          <div className="ms-address-header">
            <span className="ms-address-header-main">My addresses</span>
          </div>

          <div className="ms-address-body">
            {show_add_address_comp ? (
              <AddNewAddress
                toggleAddAddress={this.toggleAddAddress}
                addNewAddress={addNewAddress}
                setAddAddressStatus={setAddAddressStatus}
                address_status={address_status}
              />
            ) : (
              <div className="ms-address-add-button">
                <span onClick={() => this.toggleAddAddress(true)}>
                  Add a new address
                </span>
              </div>
            )}

            {addresses.map((address, index) =>
              edit_address === index ? (
                <UpdateOldAddress
                  key={address.id}
                  address={addresses[edit_address]}
                  address_status={address_status}
                  setAddAddressStatus={setAddAddressStatus}
                  updateAddress={updateAddress}
                  handleCompToEdit={this.handleCompToEdit}
                />
              ) : (
                <div
                  key={address.id}
                  className="ms-address-single-address-container checkout-page"
                  onClick={() => {
                    updateCheckout(user.checkout_id, {
                      user: user.id,
                      address: address.id
                    });
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="ms-address-single-address">
                    <div>{address.name}</div>
                    <div>{address.address}</div>
                    <div>{address.locality}</div>
                    <div>{address.landmark}</div>
                    <div>{address.city}</div>
                    <div>{address.state}</div>
                    <div>{address.country}</div>
                    <div>{address.pin_code}</div>
                    <div>Alternate phone no.- {address.alt_phone}</div>
                  </div>
                  <div className="ms-address-single-address-btn-container">
                    <button
                      className="ms-address-single-address-btn edit"
                      onClick={() => {
                        updateCheckout(user.checkout_id, {
                          user: user.id,
                          address: address.id
                        });
                        window.scrollTo(0, 0);
                      }}
                    >
                      Select
                    </button>
                    <button
                      className="ms-address-single-address-btn edit"
                      onClick={e => {
                        e.stopPropagation();
                        this.handleCompToEdit(index);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="ms-address-single-address-btn delete"
                      onClick={e => {
                        e.stopPropagation();
                        deleteAddress(address.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutAddress;
