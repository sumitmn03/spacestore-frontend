import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchInput from "../searchComponents/searchInput/SearchInput";

export class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { auth } = this.props;
    const user = auth.user;

    const log_n_reg = (
      <span className="ms-top-navbar-children ms-auth-open-btn">
        <li>Login / Register</li>
      </span>
    );

    return (
      <div className="ms-top-navbar-container">
        <div className="ms-top-navbar ms-first">
          <div className="ms-top-navbar-name">SpaceStore</div>
          <SearchInput />
          <Link to="/myaccount" className="ms-top-navbar-children first">
            <li>Account</li>
          </Link>
          <Link to="/design" className="ms-top-navbar-children first">
            <li>Design</li>
          </Link>
          <Link to="/cart" className="ms-top-navbar-children first">
            <li>Cart</li>
          </Link>
          <Link to="/more" className="ms-top-navbar-children first">
            <li>More</li>
          </Link>
        </div>
        <div className="ms-top-navbar ms-second">
          {user ? (
            user.profile && user.profile.first_name ? (
              <span className="ms-top-navbar-username">
                {user.profile.first_name.slice(0, 10)}
              </span>
            ) : (
              <span className="ms-top-navbar-username">
                {user.email.slice(0, 10)}
              </span>
            )
          ) : (
            <span className="ms-top-navbar-username-proxy"></span>
          )}
          <Link to="/" className="ms-top-navbar-children">
            <li>Home</li>
          </Link>
          <Link to="/orders" className="ms-top-navbar-children">
            <li>Orders</li>
          </Link>
          <Link to="/wishlist" className="ms-top-navbar-children">
            <li>Wishlist</li>
          </Link>
          <Link to="/help" className="ms-top-navbar-children">
            <li>Customer service</li>
          </Link>
          {auth.isAuthenticated ? <Fragment /> : log_n_reg}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
