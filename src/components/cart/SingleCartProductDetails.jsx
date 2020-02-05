import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SingleCartProductDetails extends Component {
  render() {
    let {
      createMessage,
      product,
      deleteFromCart,
      cart_id,
      addToSfl,
      saved_for_later
    } = this.props;

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
                let item_in_sfl = false;
                saved_for_later.forEach(sfl_Product => {
                  if (sfl_Product.product === product.id) {
                    item_in_sfl = true;
                  }
                });

                if (item_in_sfl) {
                  createMessage({ success: "Item already saved for later" });
                  deleteFromCart(cart_id);
                } else {
                  deleteFromCart(cart_id);
                  addToSfl(product.id);
                }
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
