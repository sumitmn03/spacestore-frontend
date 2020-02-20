import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchInput from "../searchComponents/searchInput/SearchInput";

import menuLogo from "../../logos/topNavbar/menuLogo.png";
import cartLogo from "../../logos/topNavbar/cartLogo.png";

export class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.hideShowTopNavbarOnScroll();
  }

  hideShowTopNavbarOnScroll = () => {
    /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
    if (window.innerWidth < 992) {
      let prevScrollpos = window.pageYOffset;
      window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;
        if (window.pageYOffset > 90 && prevScrollpos < currentScrollPos) {
          document.getElementsByClassName(
            "ms-top-navbar-container"
          )[0].style.top = "-90px";
        } else {
          document.getElementsByClassName(
            "ms-top-navbar-container"
          )[0].style.top = "0";
        }
        prevScrollpos = currentScrollPos;
      };
    }
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
        {window.innerWidth < "992" ? (
          <div className="ms-top-navbar first">
            <div
              className="ms-top-navbar-menu-logo-container"
              onClick={() => {
                let sidebar_page = document.getElementsByClassName(
                    "ms-sidebar-page"
                  )[0],
                  sidebar_dummy = document.getElementsByClassName(
                    "ms-sidebar-dummy"
                  )[0];
                sidebar_page.style.left = "0";
                sidebar_dummy.style.opacity = "1";
              }}
            >
              <img src={menuLogo} alt="Home" />
            </div>
            <div className="ms-top-navbar-name">SpaceStore</div>

            <Link to="/cart" className="ms-top-navbar-cart-logo-container">
              <img src={cartLogo} alt="Home" className="ms-cart-logo" />
            </Link>
          </div>
        ) : (
          <Fragment />
        )}

        <div className="ms-top-navbar ms-first">
          <div className="ms-top-navbar-name ms-not-small">SpaceStore</div>
          <SearchInput />
          <Link
            to="/myaccount"
            className="ms-top-navbar-children first ms-not-small"
          >
            <li>Account</li>
          </Link>
          <Link
            to="/design"
            className="ms-top-navbar-children first ms-not-small"
          >
            <li>Design</li>
          </Link>
          <Link
            to="/cart"
            className="ms-top-navbar-children first ms-not-small"
          >
            <li>Cart</li>
          </Link>
          <Link
            to="/more"
            className="ms-top-navbar-children first ms-not-small"
          >
            <li>More</li>
          </Link>
        </div>
        <div className="ms-top-navbar ms-second ms-not-small">
          {user ? (
            user.profile && user.profile.first_name ? (
              <span className="ms-top-navbar-username ms-not-small">
                {user.profile.first_name.slice(0, 10)}
              </span>
            ) : (
              <span className="ms-top-navbar-username ms-not-small">
                {user.email.slice(0, 10)}
              </span>
            )
          ) : (
            <span className="ms-top-navbar-username-proxy ms-not-small"></span>
          )}
          <Link to="/" className="ms-top-navbar-children ms-not-small">
            <li>Home</li>
          </Link>
          <Link to="/orders" className="ms-top-navbar-children ms-not-small">
            <li>Orders</li>
          </Link>
          <Link to="/wishlist" className="ms-top-navbar-children ms-not-small">
            <li>Wishlist</li>
          </Link>
          <Link to="/help" className="ms-top-navbar-children ms-not-small">
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
