import React, { Component } from "react";

export class SingleOrderSummary extends Component {
  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      single_cart_data,
      removeItemFromCheckout,
      checkout,
      removeSingleCheckoutItem,
      user
    } = this.props;
    const product_data = single_cart_data.cart_product;

    return (
      <div className="ms-checkout-order-sum-single-product">
        <div className="ms-checkout-order-sum-single-product-image">
          <img
            // width="150px"
            // height="150px"
            width="130px"
            height="130px"
            src={"http://localhost:8000" + product_data.image}
            alt="product"
          />
        </div>
        <div className="ms-checkout-order-sum-single-product-desc-container">
          <div className="ms-checkout-order-sum-single-product-desc">
            {product_data.name}
          </div>
          <div
            className="ms-checkout-order-sum-single-product-desc"
            style={{ color: "grey" }}
          >
            Size:{" "}
            {checkout.cart_or_single === "single"
              ? checkout.size
              : single_cart_data.size}
          </div>
          <div className="ms-checkout-order-sum-single-product-desc">
            <span className="ms-checkout-order-sum-single-product-cprice">
              ₹{product_data.original_price - product_data.seller_discount}
            </span>
            <span className="ms-checkout-order-sum-single-product-desc-oprice">
              {product_data.original_price}
            </span>
          </div>
          <div className="ms-checkout-order-sum-single-product-desc">
            Quantity:{" "}
            {checkout.cart_or_single === "single"
              ? checkout.quantity
              : single_cart_data.quantity}
          </div>
          {/* <div className="ms-checkout-order-sum-single-product-desc"> */}
          <div
            className="ms-checkout-order-sum-single-product-desc ms-checkout-order-sum-single-product-remove-btn"
            onClick={() => {
              if (checkout.cart_or_single === "single") {
                removeSingleCheckoutItem(checkout.id, {
                  user: user.id,
                  product: null
                });
              } else {
                removeItemFromCheckout(single_cart_data.id);
              }
            }}
          >
            Remove this item
          </div>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default SingleOrderSummary;
