import React, { Component } from "react";

export class StoreSingleProduct extends Component {
  images = require.context("../../pics/tshirts/", true);

  render() {
    let { product } = this.props;

    return (
      <div className="ms-store-home-img-container">
        <img
          style={{ border: "1px solid lightseagreen" }}
          src={this.images(product.image)}
          alt="product"
          width="295px"
          height="300px"
        />
        <div className="ms-store-home-img-label">{product.category}</div>
      </div>
    );
  }
}

export default StoreSingleProduct;
