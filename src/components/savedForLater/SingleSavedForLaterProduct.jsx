import React, { Component } from "react";
import { Link } from "react-router-dom";
// This component is rendered on MainCartPage

export class SingleSavedForLaterProduct extends Component {
  render() {
    let {
      product,
      deleteFromSfl,
      sfl_id,
      addToCart,
      sfl_size,
      sfl_quantity
    } = this.props;
    return (
      <div className="ms-cart-single-order">
        <Link to={`/product/${product.id}`}>
          <div className="ms-cart-single-order-image">
            <img
              // width="150px"
              // height="150px"
              width="130px"
              height="130px"
              src={"http://localhost:8000" + product.image}
              alt="product"
            />
          </div>
        </Link>
        {/* <div className="ms-single-order-description1 ms-mt-10 ms-wd-450 ms-cart-single-order"> */}
        <div>
          <div className="ms-cart-single-order-description">
            <Link
              to={`/product/${product.id}`}
              className="ms-single-order-link"
            >
              <div className="ms-cart-single-order-name">{product.name}</div>
            </Link>
            <div className="ms-cart-single-order-name">Size: {sfl_size}</div>
            <div className="ms-cart-single-order-name">
              Quantity: {sfl_quantity}
            </div>
            <div className="ms-cart-single-order-price-container ms-cart-single-order-name">
              <div className="ms-cart-single-order-current-price">
                ₹{product.current_price}
              </div>
              <div className="ms-cart-single-order-original-price">
                ₹{product.current_price + product.seller_discount}
              </div>
            </div>
          </div>
          <div className="ms-cart-remove-btn-container">
            <button
              className="ms-cart-sfl-btn"
              onClick={() => {
                deleteFromSfl(sfl_id);
                addToCart(product.id, sfl_size, sfl_quantity);
              }}
            >
              Add To Cart
            </button>
            <button
              className="ms-cart-remove-btn"
              onClick={() => {
                deleteFromSfl(sfl_id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleSavedForLaterProduct;
