import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrders } from "../../actions/orders";
import SingleOrderInTheOrderPage from "./SingleOrderInTheOrderPage";

export class OrdersPage extends Component {
  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const { orders } = this.props;

    return (
      <div className="ms-list-of-orders-page-wrapper">
        <div className="ms-orders-page-header">My Orders</div>
        {orders.length < 1 ? (
          <div className="ms-cart-no-product">Your order list is empty !</div>
        ) : (
          <Fragment />
        )}
        {orders.map((order, index) => (
          <SingleOrderInTheOrderPage key={index} order={order} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orders
});

export default connect(mapStateToProps, { getOrders })(OrdersPage);
