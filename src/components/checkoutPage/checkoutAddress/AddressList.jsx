import React, { Component, Fragment } from "react";

export class AddressList extends Component {
  state = {
    address_list_or_edit: "address_list_comp",
    id: "",
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

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    // const {
    //   id,
    //   name,
    //   address,
    //   locality,
    //   landmark,
    //   city,
    //   state,
    //   country,
    //   pincode,
    //   number
    // } = this.state;

    // this.props.updateAddress(id, {
    //   name,
    //   address,
    //   locality,
    //   landmark,
    //   city,
    //   state,
    //   country,
    //   pin_code: pincode,
    //   alt_phone: number
    // });
  };

  findComponentToRender = () => {
    const {
      address_list_or_edit,
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

    const { addresses } = this.props;

    switch (address_list_or_edit) {
      case "address_list_comp":
        return (
          <Fragment>
            {addresses.map(address => (
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
                    onClick={() =>
                      this.setState({
                        address_list_or_edit: "edit_comp"
                      })
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </Fragment>
        );

      case "edit_comp":
        return (
          <Fragment>
            <div className="ms-add-address-page">
              <div className="ms-add-address-header">Add new address</div>
              <div className="ms-add-address-body">
                <form
                  className="ms-add-address-form"
                  onSubmit={this.handleOnSubmit}
                >
                  <input
                    className="ms-add-address-form-input"
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
                    className="ms-add-address-form-input"
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
                    className="ms-add-address-form-input"
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
                    className="ms-add-address-form-input"
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
                    SAVE
                  </button>
                </form>
              </div>
            </div>
          </Fragment>
        );

      default:
        break;
    }
  };

  render() {
    return (
      <div className="ms-checkout-address-container">
        <div className="ms-checkout-address-header select">
          Select a delivery address
        </div>
        <div className="ms-checkout-address-body">
          {this.findComponentToRender()}
        </div>
      </div>
    );
  }
}

export default AddressList;
