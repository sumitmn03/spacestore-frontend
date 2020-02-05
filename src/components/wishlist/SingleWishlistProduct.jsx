import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class SingleWishlistProduct extends Component {
  render() {
    let { product, deleteFromWl, wishlist_id, addToCart } = this.props;

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
        <div className="ms-wishlist-single-order-description ms-mt-10">
          <Link to={`/product/${product.id}`} className="ms-single-order-link">
            <div className="ms-mb-10">{product.name}</div>
          </Link>
          {product.rating === null ? (
            <Fragment />
          ) : (
            <div
              style={{ padding: "2px 5px" }}
              className="ms-main-marketplace-product-rating ms-ml-5"
            >
              {product.rating}
            </div>
          )}
          <div className="ms-ml-5 ms-mb-10">XXS, XXS, XS, S, M, L, XL, XXL</div>
          <div className="ms-main-marketplace-product-price-wrapper ms-ml-5">
            <span className="ms-main-marketplace-product-current-price">
              ₹{product.original_price - product.seller_discount}
            </span>{" "}
            <span className="ms-main-marketplace-product-original-price">
              ₹{product.original_price}
            </span>
          </div>
        </div>
        <div className="ms-wishlist-btn-container ms-mt-20">
          <button
            className="ms-wishlist-sfl-btn ms-mb-10"
            onClick={() => {
              deleteFromWl(wishlist_id);
              addToCart(product.id);
            }}
          >
            Add to cart{" "}
          </button>
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
