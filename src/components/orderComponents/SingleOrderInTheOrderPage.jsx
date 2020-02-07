import React, { Component } from "react";
import { Link } from "react-router-dom";

// it's not the detailed view, it is just one of the order in the list

export class SingleOrderInTheOrderPage extends Component {
  images = require.context("../../pics/tshirts/", true);

  render() {
    const { order } = this.props;
    const product = order.product;

    return (
      <Link to={`/orders/${order.id}`} style={{ textDecoration: "none" }}>
        <div className="ms-single-order">
          <div className="ms-single-order-image">
            <img
              width="150px"
              height="150px"
              src={product.image}
              alt="product"
            />
          </div>
          <div className="ms-single-order-description1">
            <div className="ms-single-order-name">{product.name}</div>{" "}
            <div className="ms-single-order-name">
              ₹
              {order.original_price -
                order.seller_discount +
                order.shipping_charges}
            </div>
            <div className="ms-single-order-name">Size: {order.size}</div>
            <div className="ms-single-order-name">
              Quantity: {order.quantity}
            </div>
          </div>
          <div className="ms-single-order-description2">
            <div className="ms-single-order-name">
              <span> Order date:</span> {order.order_date}
            </div>
            <div className="ms-single-order-name">
              <span>Delivery status: </span> {order.delivery_status}
            </div>
            <div className="ms-single-order-name">
              <span> Delivery date:</span> {order.delivery_date}
            </div>
          </div>
          <div className="ms-past-order-option-buttons-wrapper ms-fl ms-mt-30 ms-ml-40">
            <button
              onClick={e => {
                e.preventDefault();
              }}
              className="ms-past-order-option-buttons"
            >
              Track this order
            </button>
            <button
              onClick={e => {
                e.preventDefault();
              }}
              className="ms-past-order-option-buttons"
            >
              Return this item
            </button>
            <button
              onClick={e => {
                e.preventDefault();
              }}
              className="ms-past-order-option-buttons"
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
