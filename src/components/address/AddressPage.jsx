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
import { createMessage } from "../../actions/messages";
import AddNewAddress from "./AddNewAddress";
import UpdateOldAddress from "./UpdateOldAddress";

export class AddressPage extends Component {
  state = {
    show_add_address_comp: false,
    edit_address: ""
  };

  static propTypes = {
    getAddresses: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    addresses: PropTypes.array.isRequired,
    addNewAddress: PropTypes.func.isRequired,
    setAddAddressStatus: PropTypes.func.isRequired,
    updateAddress: PropTypes.func.isRequired,
    address_status: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.getAddresses();
  }

  toggleAddAddress = show_add_address_comp =>
    this.setState({ show_add_address_comp, edit_address: "" });

  handleCompToEdit = index =>
    this.setState({ show_add_address_comp: false, edit_address: index });

  render() {
    const {
      addresses,
      // createMessage,
      deleteAddress,
      addNewAddress,
      setAddAddressStatus,
      address_status,
      updateAddress
    } = this.props;

    const { show_add_address_comp, edit_address } = this.state;

    return (
      <div className="ms-address-page">
        <div className="ms-address-header">
          {/* <span className="ms-address-header-main">MY ADDRESSES</span> */}
            MY ADDRESSES
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
                className="ms-address-single-address-container"
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
                    onClick={() => this.handleCompToEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="ms-address-single-address-btn delete"
                    onClick={() => deleteAddress(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addresses: state.address.addresses,
  address_status: state.address.address_status
});

export default connect(mapStateToProps, {
  getAddresses,
  deleteAddress,
  createMessage,
  addNewAddress,
  setAddAddressStatus,
  updateAddress
})(AddressPage);
