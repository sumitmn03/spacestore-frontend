import React, { Component } from "react";

export class AddNewAddress extends Component {
  state = {
    name: "",
    address: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    number: ""
  };

  componentDidMount() {
    this.props.setAddAddressStatus("normal");
  }

  componentDidUpdate(prevProps) {
    const { address_status } = this.props;
    if (address_status !== prevProps.address_status) {
      if (address_status === "success") this.props.toggleAddAddress(false);
    }
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const {
      name,
      address,
      locality,
      landmark,
      city,
      state,
      country,
      pincode,
      number
    } = this.state;

    this.props.addNewAddress({
      name,
      address,
      locality,
      landmark,
      city,
      state,
      country,
      pin_code: pincode,
      alt_phone: number
    });
  };

  render() {
    const {
      name,
      address,
      locality,
      landmark,
      city,
      state,
      country,
      pincode,
      number
    } = this.state;

    const { address_status, toggleAddAddress } = this.props;

    return (
      <div className="ms-add-address-page">
        <div className="ms-add-address-header">Add a new address</div>
        <div className="ms-add-address-body">
          <form className="ms-add-address-form" onSubmit={this.handleOnSubmit}>
            <input
              className="ms-add-address-form-input first"
              name="name"
              placeholder="Full name"
              type="text"
              value={name}
              onChange={this.handleOnChange}
            />
            <input
              className="ms-add-address-form-input"
              name="number"
              placeholder="Phone number"
              type="number"
              value={number}
              onChange={this.handleOnChange}
            />
            <textarea
              className="ms-add-address-form-textarea"
              name="address"
              placeholder="Address (Area and street)"
              rows="5"
              value={address}
              onChange={this.handleOnChange}
            ></textarea>
            <br />
            <input
              className="ms-add-address-form-input first"
              name="locality"
              placeholder="Locality"
              type="text"
              value={locality}
              onChange={this.handleOnChange}
            />
            <input
              className="ms-add-address-form-input"
              name="landmark"
              placeholder="Landmark  (E.g.- Near ISBT bus stop)"
              type="text"
              value={landmark}
              onChange={this.handleOnChange}
            />
            <input
              className="ms-add-address-form-input first"
              name="city"
              placeholder="City / Town / District"
              type="text"
              value={city}
              onChange={this.handleOnChange}
            />
            <input
              className="ms-add-address-form-input"
              name="state"
              placeholder="State"
              type="text"
              value={state}
              onChange={this.handleOnChange}
            />
            <input
              className="ms-add-address-form-input first"
              name="country"
              placeholder="Country"
              type="text"
              value={country}
              onChange={this.handleOnChange}
            />
            <input
              className="ms-add-address-form-input"
              name="pincode"
              placeholder="Pincode"
              type="number"
              value={pincode}
              onChange={this.handleOnChange}
            />
            <button className="ms-add-address-form-submit" type="submit">
              {address_status === "loading" ? "Loading..." : "SAVE"}
            </button>
            <span
              className="ms-add-address-form-cancel"
              onClick={() => toggleAddAddress(false)}
            >
              CANCEL
            </span>
          </form>
        </div>
      </div>
    );
  }
}

export default AddNewAddress;
