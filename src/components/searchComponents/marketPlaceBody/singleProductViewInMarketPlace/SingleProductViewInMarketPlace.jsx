import React, { Component, Fragment } from "react";

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
      name,
      rating,
      original_price,
      seller_discount,
      size_n_quantity
    } = product;

    let sizes = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "XXS", "XXXS"],
      temp_sizes = [],
      temp_arr = [];

    temp_sizes = sizes.map(size =>
      size_n_quantity.map(size_obj => {
        if (
          size === size_obj.size &&
          size_obj.quantity > 0 &&
          !temp_arr.includes(size)
        ) {
          temp_arr = [...temp_arr, size];
          return (
            <span
              key={size_obj.id}
              className="ms-main-marketplace-product-sizes-children"
            >
              {size}
            </span>
          );
        } else {
          return <Fragment key={size_obj.id} />;
        }
      })
    );

    return (
      <div className="ms-main-marketplace-product" onClick={this.handleOnClick}>
        <div>
          <img width="295px" height="300px" src={image} alt="product" />
        </div>
        <div className="ms-main-marketplace-product-name">{name}</div>
        {rating ? (
          <div className="ms-main-marketplace-product-rating">{rating}</div>
        ) : (
          <Fragment />
        )}
        <div className="ms-main-marketplace-product-price-wrapper">
          <span className="ms-main-marketplace-product-current-price">
            ₹{original_price - seller_discount}
          </span>{" "}
          <span className="ms-main-marketplace-product-original-price">
            ₹{original_price}
          </span>
        </div>
        <div className="ms-main-marketplace-product-sizes">
          <span className="ms-main-marketplace-product-sizes-header">
            Sizes:
          </span>
          {temp_sizes}
        </div>
      </div>
    );
  }
}

export default SingleProductView;
