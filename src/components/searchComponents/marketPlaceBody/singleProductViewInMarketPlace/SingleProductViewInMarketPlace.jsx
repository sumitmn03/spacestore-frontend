import React, { Component } from "react";

export class SingleProductView extends Component {
  // images = require.context("../../../../pics/tshirts/", true);

  render() {
    let { product } = this.props;
    let sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

    return (
      <div className="ms-main-marketplace-product">
        <div>
          <img width="295px" height="300px" src={product.image} alt="product" />
        </div>
        <div className="ms-main-marketplace-product-name">{product.name}</div>
        <div className="ms-main-marketplace-product-rating">
          {product.rating} / 5
        </div>
        <div className="ms-main-marketplace-product-price-wrapper">
          <span className="ms-main-marketplace-product-current-price">
            ₹{product.original_price - product.seller_discount}
          </span>{" "}
          <span className="ms-main-marketplace-product-original-price">
            ₹{product.original_price}
          </span>
        </div>
        <div className="ms-main-marketplace-product-sizes">
          {sizes.map(size => size + " ")}
        </div>
      </div>
    );
  }
}

export default SingleProductView;
