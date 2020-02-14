import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getOrderDetail, getParentOrder } from "../../actions/orders";
import SameOrderProduct from "./SameOrderProduct";

export class PastOrderDetail extends Component {
  static propTypes = {
    getOrderDetail: PropTypes.func.isRequired,
    selected_order: PropTypes.object.isRequired,
    order_loading: PropTypes.bool.isRequired,
    parent_order: PropTypes.object.isRequired,
    getParentOrder: PropTypes.func.isRequired
  };

  images = require.context("../../pics/tshirts/", true);

  componentDidMount() {
    this.props.getParentOrder(
      this.props.match.params.order_id,
      this.props.match.params.child_id
    );
  }

  render() {
    const { parent_order, selected_order, order_loading } = this.props;
    let address = parent_order.address,
      selected_product = selected_order.product;

    console.log(selected_order);

    if (order_loading) {
      return <div>Loading...</div>;
    } else if (parent_order) {
      return (
        <div className="ms-past-order-detail-wrapper">
          <div className="ms-past-order-detail-header">Order Details</div>

          <div className="ms-past-order-detail-firstblock">
            <div className="ms-past-order-detail-address">
              <div className="ms-past-order-address-header">
                Delivery Address
              </div>
              <div className="ms-past-order-element">{address.name},</div>
              <div className="ms-past-order-element">{address.address},</div>
              <div className="ms-past-order-element">{address.locality},</div>
              <div className="ms-past-order-element">{address.landmark},</div>
              <div className="ms-past-order-element">{address.city},</div>
              <div className="ms-past-order-element">{address.state},</div>
              <div className="ms-past-order-element">{address.country},</div>
              <div className="ms-past-order-element">{address.pin_code}</div>
              <div className="ms-past-order-element">
                Alternate phone no.- {address.alt_phone}
              </div>
            </div>
            <div className="ms-past-order-payment-details">
              <div className="ms-past-order-payment-header">
                Payment Details
              </div>
              <div className="ms-past-order-payment-amount-container">
                Products Price :
                <span className="ms-past-order-payment-amount">
                  ₹{selected_order.original_price}
                </span>
              </div>
              <div className="ms-past-order-payment-amount-container">
                Offer Applied :
                <span className="ms-past-order-payment-amount">
                  - ₹{selected_order.seller_discount}
                </span>
              </div>
              <div className="ms-past-order-payment-amount-container">
                Shipping charges :
                <span className="ms-past-order-payment-amount">
                  ₹{selected_order.shipping_charges}
                </span>
              </div>
              <div className="ms-past-order-payment-amount-container">
                Total :
                <span className="ms-past-order-payment-amount">
                  ₹
                  {selected_order.original_price -
                    selected_order.seller_discount +
                    selected_order.shipping_charges}
                </span>
              </div>
            </div>
          </div>

          <div className="ms-past-order-detail-secondblock">
            <Link to={`/product/${selected_product.id}`}>
              <div className="ms-past-order-image">
                <img
                  width="150px"
                  height="150px"
                  src={selected_product.image}
                  alt="product"
                />
              </div>
            </Link>
            <div className="ms-past-order-description">
              <Link
                to={`/product/${selected_product.id}`}
                className="ms-single-order-link"
              >
                <div>{selected_product.name}</div>
              </Link>
              <div>
                ₹
                {selected_order.original_price -
                  selected_order.seller_discount +
                  selected_order.shipping_charges}
              </div>
              <div>Size: {selected_order.size}</div>
              <div>Quantity: {selected_order.quantity}</div>
            </div>
            <div className="ms-past-order-option-buttons-wrapper">
              <button className="ms-past-order-option-buttons">Invoice</button>
              <button className="ms-past-order-option-buttons">Return</button>
              <button className="ms-past-order-option-buttons">
                Rate & Review
              </button>
              <button className="ms-past-order-option-buttons">Help</button>
            </div>
          </div>
          {parent_order.children_orders.length > 1 ? (
            <div className="ms-past-order-same-order">
              <div className="ms-same-order-header">
                Products with same order ID
              </div>
              {parent_order.children_orders.map(
                (single_children_order, index) =>
                  selected_order.order_id !== single_children_order.order_id ? (
                    <SameOrderProduct
                      key={index}
                      order={single_children_order}
                    />
                  ) : (
                    <Fragment key={index} />
                  )
              )}
            </div>
          ) : (
            <Fragment />
          )}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => ({
  selected_order: state.orders.selected_order,
  order_loading: state.orders.order_loading,
  parent_order: state.orders.parent_order
});

export default connect(mapStateToProps, { getOrderDetail, getParentOrder })(
  PastOrderDetail
);
