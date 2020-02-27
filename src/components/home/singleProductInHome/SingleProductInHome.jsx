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
    let { image, current_price, seller_discount } = product;

    return (
      <div className="ms-home-category-product" onClick={this.handleOnClick}>
        <div>
          <img
            src={image}
            alt="product"
            className="ms-home-category-product-img"
          />
        </div>
        {/* <div className="ms-home-category-product-name">{name}</div>
        <div className="ms-home-category-product-rating">5.8</div> */}
        <div className="ms-home-category-product-price-wrapper">
          <span className="ms-home-category-product-current-price">
            ₹{current_price}
          </span>{" "}
          <span className="ms-home-category-product-original-price">
            ₹{current_price + seller_discount}
          </span>
        </div>
      </div>
    );
  }
}

export default SingleProductView;
