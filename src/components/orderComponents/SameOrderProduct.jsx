import React, { Component } from "react";
import { Link } from "react-router-dom";

// it's not the detailed view, it is just one of the order in the list

export class SingleOrderInTheOrderPage extends Component {
  images = require.context("../../pics/tshirts/", true);

  render() {
    const { order } = this.props;
    const product = order.product;

    return (
      <Link
        to={`/orders/${order.parent_order}/${order.order_id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="ms-same-order">
          <div className="ms-same-order-image">
            <img
              width="150px"
              height="150px"
              src={product.image}
              alt="product"
            />
          </div>
          <div className="ms-same-order-description1">
            <div className="ms-same-order-name">{product.name}</div>{" "}
            <div className="ms-same-order-name">
              ₹
              {order.original_price -
                order.seller_discount +
                order.shipping_charges}
            </div>
            <div className="ms-same-order-name">Size: {order.size}</div>
            <div className="ms-same-order-name">Quantity: {order.quantity}</div>
          </div>
          <div className="ms-same-order-option-buttons-wrapper">
            <button
              onClick={e => {
                e.preventDefault();
              }}
              className="ms-same-order-option-buttons"
            >
              Track this order
            </button>
            <button
              onClick={e => {
                e.preventDefault();
              }}
              className="ms-same-order-option-buttons"
            >
              Return this item
            </button>
            <button
              onClick={e => {
                e.preventDefault();
              }}
              className="ms-same-order-option-buttons"
            >
              Rate & review product
            </button>
          </div>
        </div>
      </Link>
    );
  }
}

export default SingleOrderInTheOrderPage;
