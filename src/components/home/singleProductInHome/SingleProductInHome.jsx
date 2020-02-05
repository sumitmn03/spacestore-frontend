import React, { Component } from "react";

export class SingleProductView extends Component {
  handleOnClick = () => {
    window.open(
      `http://localhost:3000/#/product/${this.props.product.id}`,
      "_blank"
    );
  };

  render() {
    let { product } = this.props;
    let {
      image,
      name
      // rating,
      // original_price,
      // seller_discount,
      // size_n_quantity
    } = product;

    return (
      <div className="ms-home-category-product" onClick={this.handleOnClick}>
        <div>
          <img width="280px" height="280px" src={image} alt="product" />
        </div>
        <div className="ms-home-category-product-name">{name}</div>
        <div className="ms-home-category-product-rating">5.8</div>
        <div className="ms-home-category-product-price-wrapper">
          <span className="ms-home-category-product-current-price">₹300</span>{" "}
          <span className="ms-home-category-product-original-price">₹450</span>
        </div>
      </div>
    );
  }
}

export default SingleProductView;
