import React, { Component } from "react";
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
      <div className="ms-sidebar-page" onClick={this.handleSidebarClose}>
        <div className="ms-sidebar-container">
          <div className="ms-sidebar-page-greetings">
            Hello, Sumit <div className="ms-sidebar-close">x</div>
          </div>
          <div className="ms-sidebar-page-option-cont">
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/"
              >
                Home
              </Link>
            </div>
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/design"
              >
                Start Designing
              </Link>
            </div>
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/orders"
              >
                My Orders
              </Link>
            </div>
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/cart"
              >
                My Cart
              </Link>
            </div>
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/wishlist"
              >
                My Wishlist
              </Link>
            </div>
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/myaccount"
              >
                My Account
              </Link>
            </div>
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/help"
              >
                Customer Service
              </Link>
            </div>
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/"
              >
                Settings
              </Link>
            </div>
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/about"
              >
                About
              </Link>
            </div>
            <div className="ms-sidebar-page-option">
              <Link
                className="ms-sidebar-page-option-link"
                onClick={this.handleSidebarClose}
                to="/more"
              >
                More
              </Link>
            </div>
          </div>
        </div>
        <div className="ms-sidebar-dummy"></div>
      </div>
    );
  }
}

export default Sidebar;
