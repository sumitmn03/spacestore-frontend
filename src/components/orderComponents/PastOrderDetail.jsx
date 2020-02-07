import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getOrderDetail } from "../../actions/orders";

export class PastOrderDetail extends Component {
  static propTypes = {
    getOrderDetail: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    order_loading: PropTypes.bool.isRequired
  };

  images = require.context("../../pics/tshirts/", true);

  componentDidMount() {
    this.props.getOrderDetail(this.props.match.params.id);
  }

  render() {
    const { order, order_loading } = this.props;
    let product = order.product,
      address = order.address;

    if (order_loading) {
      return <div>Loading...</div>;
    } else if (product) {
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
                  ₹{order.original_price}
                </span>
              </div>
              <div className="ms-past-order-payment-amount-container">
                Offer Applied :
                <span className="ms-past-order-payment-amount">
                  - ₹{order.seller_discount}
                </span>
              </div>
              <div className="ms-past-order-payment-amount-container">
                Shipping charges :
                <span className="ms-past-order-payment-amount">
                  ₹{order.shipping_charges}
                  {/* add shipping charges to the database as well... in order table */}
                </span>
              </div>
              <div className="ms-past-order-payment-amount-container">
                Total :
                <span className="ms-past-order-payment-amount">
                  ₹
                  {order.original_price -
                    order.seller_discount +
                    order.shipping_charges}
                </span>
              </div>
            </div>
          </div>

          <div className="ms-past-order-detail-secondblock">
            <Link to={`/product/${product.id}`}>
              <div className="ms-past-order-image">
                <img
                  width="150px"
                  height="150px"
                  src={product.image}
                  alt="product"
                />
              </div>
            </Link>
            <div className="ms-past-order-description">
              <Link
                to={`/product/${product.id}`}
                className="ms-single-order-link"
              >
                <div>{product.name}</div>
              </Link>
              <div>
                ₹
                {order.original_price -
                  order.seller_discount +
                  order.shipping_charges}
              </div>
              <div>Size: {order.size}</div>
              <div>Quantity: {order.quantity}</div>
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
        </div>
      );
    } else {
      return <div>Loaning...</div>;
    }
  }
}

const mapStateToProps = state => ({
  order: state.orders.order,
  order_loading: state.orders.order_loading
});

export default connect(mapStateToProps, { getOrderDetail })(PastOrderDetail);
