import React, { Component } from "react";

export class SingleCartProductDetails extends Component {
  render() {
    let { product, deleteFromCart, cart_id, addToSfl } = this.props;

    return (
      <div className="ms-cart-single-order">
        <div className="ms-single-order-image">
          <img
            width="150px"
            height="150px"
            src={"http://localhost:8000" + product.image}
            alt="product"
          />
        </div>
        <div className="ms-single-order-description1 ms-mt-10 ms-wd-450 ms-cart-single-order">
          <div className="ms-single-order-name">{product.name}</div>
          <div className="ms-single-order-name">Size: XS</div>
          <div className="ms-single-order-name">Quantity: 3</div>
          <div className="ms-cart-remove-btn-container">
            <button
              className="ms-cart-sfl-btn"
              onClick={() => {
                deleteFromCart(cart_id);
                addToSfl(product.id);
              }}
            >
              Save For Later
            </button>
            <button
              className="ms-cart-remove-btn"
              onClick={() => {
                deleteFromCart(cart_id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="ms-cart-single-order-price">
          ₹{product.original_price - product.seller_discount}
        </div>
      </div>
    );
  }
}

export default SingleCartProductDetails;
