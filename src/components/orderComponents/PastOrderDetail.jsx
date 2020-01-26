import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
    let product = order.order_product,
      address = order.order_address;
    if (order_loading) {
      return <div>Loaning...</div>;
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
              <div>
                Products Price :
                <span className="ms-past-order-payment-amount">
                  ₹{product.original_price - product.seller_discount}
                </span>
              </div>
              <div>
                Shipping charges :
                <span className="ms-past-order-payment-amount">
                  ₹{order.shipping_charges}
                  {/* add shipping charges to the database as well... in order table */}
                </span>
              </div>
              <div>
                Offer Applied :
                <span className="ms-past-order-payment-amount">
                  - ₹{order.offer_applied}
                </span>
              </div>
              <div>
                Total :
                <span className="ms-past-order-payment-amount">
                  {product.original_price -
                    product.seller_discount +
                    order.shipping_charges -
                    order.offer_applied}
                </span>
              </div>
            </div>
          </div>

          <div className="ms-past-order-detail-secondblock">
            <div className="ms-past-order-image">
              <img
                width="150px"
                height="150px"
                src={"http://localhost:8000" + product.image}
                alt="product"
              />
            </div>
            <div className="ms-past-order-description">
              <div>{product.name}</div>{" "}
              <div>₹{product.original_price - product.seller_discount}</div>
              <div>Size: XS</div>
              <div>Quantity: 3</div>
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
