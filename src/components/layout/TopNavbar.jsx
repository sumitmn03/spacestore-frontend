import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { auth } = this.props;
    const user = auth.user;
    const authLinks = (
      <span onClick={this.props.logout} className="ms-top-navbar-children">
        <li>Logout</li>
      </span>
    );

    const log_n_reg = (
      <span className="ms-top-navbar-children ms-auth-open-btn">
        <li>Login / Register</li>
      </span>
    );

    return (
      <div className="ms-top-navbar-container">
        <div className="ms-top-navbar ms-first">
          <div className="ms-top-navbar-name">SpaceStore</div>
          <div className="search-container">
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <input type="text" placeholder="Search..." name="search" />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>{" "}
          <Link to="/myprofile" className="ms-top-navbar-children first">
            <li>Account</li>
          </Link>{" "}
          <Link to="/design" className="ms-top-navbar-children first">
            <li>Design</li>
          </Link>
          {/* <Link to="/store" className="ms-top-navbar-children first">
            <li>Store</li>
          </Link> */}
          <Link to="/cart" className="ms-top-navbar-children first">
            <li>Cart</li>
          </Link>
          <Link to="/cart" className="ms-top-navbar-children first">
            <li>More</li>
          </Link>
        </div>
        <div className="ms-top-navbar ms-second">
          {user ? (
            user.profile && user.profile.first_name ? (
              <span className="ms-top-navbar-username">
                {user.profile.first_name.slice(0, 12)}
              </span>
            ) : (
              <span className="ms-top-navbar-username">
                {user.email.slice(0, 12)}
              </span>
            )
          ) : (
            <Fragment />
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
          {/* <Link to="/store" className="ms-top-navbar-children">
            <li>Sell</li>
          </Link> */}
          <Link to="/search" className="ms-top-navbar-children">
            <li>Search</li>
          </Link>
          <Link to="/about" className="ms-top-navbar-children">
            <li>About</li>
          </Link>
          <Link to="/help" className="ms-top-navbar-children">
            <li>Customer service</li>
          </Link>
          {auth.isAuthenticated ? authLinks : log_n_reg}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
