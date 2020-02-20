import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class MyAccount extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    let options = [
      { name: "My Profile", link: "myprofile" },
      { name: "My Orders", link: "orders" },
      { name: "My Cart", link: "cart" },
      { name: "My Wishlist", link: "wishlist" },
      { name: "My Addresses", link: "address" }
    ];

    return (
      <div className="ms-myaccount-page">
        <div className="ms-myaccount-header">MY ACCOUNT</div>
        <div className="ms-myaccount-body">
          <div className="ms-myaccount-body-option-container">
            {options.map((option, index) => (
              <Link
                key={index}
                to={`/${option.link}`}
                style={{ color: "white" }}
              >
                <div className="ms-myaccount-body-option">{option.name}</div>
              </Link>
            ))}
            <Link to="" style={{ color: "white" }}>
              <div
                className="ms-myaccount-body-option"
                onClick={() => {
                  this.props.logout();
                }}
              >
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(MyAccount);
