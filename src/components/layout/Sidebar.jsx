import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class Sidebar extends Component {
  handleSidebarClose = e => {
    let sidebar_page = document.getElementsByClassName("ms-sidebar-page")[0],
      sidebar_dummy = document.getElementsByClassName("ms-sidebar-dummy")[0],
      sidebar_close = document.getElementsByClassName("ms-sidebar-close")[0],
      sidebar_link = document.getElementsByClassName(
        "ms-sidebar-page-option-link"
      )[0];
    if (
      e.target === sidebar_dummy ||
      e.target === sidebar_close ||
      sidebar_link
    ) {
      sidebar_page.style.left = "-200%";
      sidebar_dummy.style.opacity = "0";
    }
  };

  render() {
    return (
      <Fragment>
        {window.innerWidth < "992" ? (
          <div className="ms-sidebar-page" onClick={this.handleSidebarClose}>
            <div className="ms-sidebar-container">
              <div className="ms-sidebar-page-greetings">Hello, Sumit</div>
              <div className="ms-sidebar-page-option-cont">
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/"
                >
                  <div className="ms-sidebar-page-option">Home</div>
                </Link>
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/design"
                >
                  <div className="ms-sidebar-page-option">Start Designing</div>
                </Link>
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/orders"
                >
                  <div className="ms-sidebar-page-option">My Orders </div>
                </Link>
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/cart"
                >
                  <div className="ms-sidebar-page-option">My Cart</div>
                </Link>
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/wishlist"
                >
                  <div className="ms-sidebar-page-option">My Wishlist</div>
                </Link>
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/myaccount"
                >
                  <div className="ms-sidebar-page-option">My Account</div>
                </Link>
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/help"
                >
                  <div className="ms-sidebar-page-option">Customer Service</div>
                </Link>
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/"
                >
                  <div className="ms-sidebar-page-option">Settings</div>
                </Link>
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/about"
                >
                  <div className="ms-sidebar-page-option">About</div>
                </Link>
                <Link
                  className="ms-sidebar-page-option-link"
                  onClick={this.handleSidebarClose}
                  to="/more"
                >
                  <div className="ms-sidebar-page-option">More</div>
                </Link>
              </div>
            </div>
            <div className="ms-sidebar-dummy"></div>
          </div>
        ) : (
          <Fragment />
        )}
      </Fragment>
    );
  }
}

export default Sidebar;
