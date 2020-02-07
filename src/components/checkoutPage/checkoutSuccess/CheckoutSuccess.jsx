import React, { Component } from "react";
import { Link } from "react-router-dom";

export class CheckoutSuccess extends Component {
  render() {
    return (
      <div>
        <div>Hurray your order is success full</div>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    );
  }
}

export default CheckoutSuccess;
