import React, { Component, Fragment } from "react";

export class SingleWishlistProduct extends Component {
  render() {
    let { product, deleteFromWl, wishlist_id, addToCart } = this.props;

    return (
      <div className="ms-wishlist-single-order">
        <div className="ms-wishlist-single-order-image">
          <img
            width="150px"
            height="150px"
            src={"http://localhost:8000" + product.image}
            alt="product"
          />
        </div>
        <div className="ms-wishlist-single-order-description ms-mt-10">
          <div className="ms-mb-10">{product.name}</div>
          {product.modified_rating === null ? (
            <Fragment />
          ) : (
            <div className="ms-main-marketplace-product-rating ms-ml-5">
              {product.modified_rating} / 5
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
