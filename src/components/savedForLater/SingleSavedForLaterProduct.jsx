import React, { Component } from "react";
import { Link } from "react-router-dom";
// This component is rendered on MainCartPage

export class SingleSavedForLaterProduct extends Component {
  render() {
    let {
      createMessage,
      product,
      deleteFromSfl,
      sfl_id,
      addToCart,
      cart
    } = this.props;
    // console.log(product, cart);
    return (
      <div className="ms-cart-single-order">
        <Link to={`/product/${product.id}`}>
          <div className="ms-single-order-image">
            <img
              width="150px"
              height="150px"
              src={"http://localhost:8000" + product.image}
              alt="product"
            />
          </div>
        </Link>
        <div className="ms-single-order-description1 ms-mt-10 ms-wd-450 ms-cart-single-order">
          <Link to={`/product/${product.id}`} className="ms-single-order-link">
            <div className="ms-single-order-name">{product.name}</div>
          </Link>
          <div className="ms-single-order-name">Size: XS</div>
          <div className="ms-single-order-name">Quantity: 1</div>
          <div className="ms-cart-remove-btn-container">
            <button
              className="ms-cart-sfl-btn"
              onClick={() => {
                let item_in_cart = false;
                cart.forEach(cart_product => {
                  if (cart_product.product === product.id) {
                    item_in_cart = true;
                  }
                });

                if (item_in_cart) {
                  createMessage({ success: "Item already added to cart" });
                  deleteFromSfl(sfl_id);
                } else {
                  deleteFromSfl(sfl_id);
                  addToCart(product.id);
                }
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
        <div className="ms-cart-single-order-price">
          ₹{product.original_price - product.seller_discount}
        </div>
      </div>
    );
  }
}

export default SingleSavedForLaterProduct;
