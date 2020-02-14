import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class SingleWishlistProduct extends Component {
  render() {
    let { product, deleteFromWl, wishlist_id } = this.props;

    return (
      <div className="ms-wishlist-single-order">
        <Link to={`/product/${product.id}`}>
          <div className="ms-wishlist-single-order-image">
            <img
              width="150px"
              height="150px"
              src={"http://localhost:8000" + product.image}
              alt="product"
            />
          </div>
        </Link>
        <div className="ms-wishlist-single-order-description">
          <Link
            to={`/product/${product.id}`}
            className="ms-wishlist-single-order-link"
          >
            <div>{product.name}</div>
          </Link>
          {product.rating === null ? (
            <Fragment />
          ) : (
            <div className="ms-wishlist-single-order-rating">
              {product.rating}
            </div>
          )}
          <div className="ms-wishlist-order-price-wrapper">
            <span className="ms-wishlist-order-current-price">
              ₹{product.original_price - product.seller_discount}
            </span>{" "}
            <span className="ms-wishlist-order-original-price">
              ₹{product.original_price}
            </span>
          </div>
        </div>
        <div className="ms-wishlist-btn-container">
          <button
            className="ms-wishlist-remove-btn"
            onClick={() => {
              deleteFromWl(wishlist_id);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default SingleWishlistProduct;
