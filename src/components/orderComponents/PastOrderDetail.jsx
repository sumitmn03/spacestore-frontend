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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.child_id !== this.props.match.params.child_id) {
      this.props.getParentOrder(
        this.props.match.params.order_id,
        this.props.match.params.child_id
      );
    }
  }

  getReturnBtn = () => {
    const { selected_order } = this.props;

    let order_btn;

    if (
      selected_order.delivery_status.toUpperCase() === "CANCELLED" ||
      selected_order.delivery_status.toUpperCase() === "RETURN REQUESTED" ||
      selected_order.delivery_status.toUpperCase() === "OUT FOR PICKUP" ||
      selected_order.delivery_status.toUpperCase() === "OUT OF PICKUP" ||
      selected_order.delivery_status.toUpperCase() === "PICKED UP" ||
      selected_order.delivery_status.toUpperCase() === "SHIPPED BACK" ||
      selected_order.delivery_status.toUpperCase() ===
        "RECEIVED BY THE SELLER" ||
      selected_order.delivery_status.toUpperCase() === "CANCEL RETURN" ||
      selected_order.delivery_status.toUpperCase() === "RETURNED"
    ) {
      order_btn = (
        <button
          className="ms-past-order-option-buttons-disabled"
          disabled={true}
        >
          {selected_order.delivery_status.toUpperCase() === "DELIVERED"
            ? "Return"
            : "Cancel"}
        </button>
      );
    } else {
      order_btn = (
        <Link
          to={`/return/${selected_order.order_id}`}
          className="ms-single-order-link"
        >
          <button className="ms-past-order-option-buttons">
            {selected_order.delivery_status.toUpperCase() === "DELIVERED"
              ? "Return"
              : "Cancel"}
          </button>
        </Link>
      );
    }

    return order_btn;
  };

  render() {
    const { parent_order, selected_order, order_loading } = this.props;
    let address = parent_order.address,
      selected_product = selected_order.product;

    if (order_loading) {
      return <div>Loading...</div>;
    } else if (parent_order) {
      return (
        <div className="ms-past-order-detail-wrapper">
          <div>
            <div className="ms-past-order-detail-header">ORDER DETAILS</div>
            <div className="ms-past-order-detail-body">
              <div className="ms-past-order-detail-order-detail">
                <span>Order ID</span> {selected_order.order_id}
              </div>
              <div className="ms-past-order-detail-order-detail">
                <span>Order date</span> {selected_order.order_date}
              </div>
              <div className="ms-past-order-detail-order-detail">
                <span>Order status</span> {selected_order.delivery_status}
              </div>
            </div>
          </div>

          <div className="ms-past-order-detail-product-n-button-container">
            <div className="ms-past-order-detail-product-container">
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
                  <div className="ms-past-order-description-name">
                    {selected_product.name}
                  </div>
                </Link>
                <div className="ms-past-order-description-name">
                  ₹
                  {selected_order.current_price +
                    selected_order.shipping_charges}
                </div>
                <div className="ms-past-order-description-name">
                  Size: {selected_order.size}
                </div>
                <div className="ms-past-order-description-name">
                  Quantity: {selected_order.quantity}
                </div>
              </div>
            </div>

            <div className="ms-past-order-option-buttons-wrapper">
              {selected_order.delivery_status.toUpperCase() === "DELIVERED" ? (
                <a
                  href={selected_order.invoice}
                  target="_blank"
                  rel="noopener noreferrer" // Got a security warning message in the console, so using this here
                  className="ms-past-order-option-buttons ms-past-order-option-link"
                >
                  {/* <button className="ms-past-order-option-buttons"> */}
                  Invoice
                  {/* </button> */}
                </a>
              ) : (
                <button
                  className="ms-past-order-option-buttons-disabled"
                  disabled={true}
                >
                  Invoice
                </button>
              )}

              {selected_order.delivery_status.toUpperCase() === "DELIVERED" ? (
                <Link
                  to={`/product/reviews_n_ratings/${selected_product.id}`}
                  className="ms-past-order-option-link"
                >
                  <button className="ms-past-order-option-buttons">
                    Rate & Review
                  </button>
                </Link>
              ) : (
                <button
                  className="ms-past-order-option-buttons-disabled"
                  disabled={true}
                >
                  Rate & Review
                </button>
              )}

              {this.getReturnBtn()}

              <Link to="/help" className="ms-past-order-option-link">
                <button className="ms-past-order-option-buttons">Help</button>
              </Link>
            </div>
          </div>

          <div className="ms-past-order-payment-details">
            <div className="ms-past-order-payment-details-header">
              PAYMENT DETAILS
            </div>
            <div className="ms-past-order-payment-details-body">
              <div>
                Products Price
                <span className="ms-past-order-payment-amount">
                  ₹
                  {selected_order.current_price +
                    selected_order.seller_discount}
                </span>
              </div>
              <div>
                Offer Applied
                <span className="ms-past-order-payment-amount">
                  - ₹{selected_order.seller_discount}
                </span>
              </div>
              <div>
                Shipping charges
                <span className="ms-past-order-payment-amount">
                  ₹{selected_order.shipping_charges}
                </span>
              </div>
              <div className="ms-past-order-payment-amount-container total">
                Total
                <span className="ms-past-order-payment-amount total">
                  ₹
                  {selected_order.current_price +
                    selected_order.shipping_charges}
                </span>
              </div>
            </div>
          </div>

          <div className="ms-past-order-shipping-details">
            <div className="ms-past-order-detail-header">SHIPPING DETAILS</div>
            {address ? (
              <div className="ms-past-order-detail-body">
                <div>{address.name},</div>
                <div>{address.address},</div>
                <div>{address.locality},</div>
                <div>{address.landmark},</div>
                <div>{address.city},</div>
                <div>{address.state},</div>
                <div>{address.country},</div>
                <div>{address.pin_code}</div>
                <div>Alternate phone no.- {address.alt_phone}</div>
              </div>
            ) : (
              <Fragment />
            )}
          </div>

          {parent_order.children_orders &&
          parent_order.children_orders.length > 1 ? (
            <div className="ms-past-order-same-order">
              <div className="ms-past-order-same-order-header">
                PRODUCTS WITH SAME ORDER ID
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

export default connect(mapStateToProps, {
  getOrderDetail,
  getParentOrder
})(PastOrderDetail);
