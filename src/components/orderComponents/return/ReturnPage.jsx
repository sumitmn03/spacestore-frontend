import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getOrderDetail, cancelOrder } from "../../../actions/orders";
import { createMessage } from "../../../actions/messages";

export class ReturnPage extends Component {
  state = {
    selected_cancel_reason: ""
  };

  static propTypes = {
    getOrderDetail: PropTypes.func.isRequired,
    cancelOrder: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    selected_order: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.props.selected_order.delivery_status === "Return requested")
      this.props.history.push("/orders");

    if (!this.props.selected_order.order_id)
      this.props.getOrderDetail(this.props.match.params.order_id);
  }

  componentDidUpdate() {
    if (this.props.selected_order.delivery_status === "Return requested")
      this.props.history.push("/orders");
  }

  render() {
    const { selected_cancel_reason } = this.state;

    const { selected_order, cancelOrder, createMessage } = this.props;

    let cancel_reasons;
    cancel_reasons = [
      "Order placed by mistake",
      "Bought it from somewhere else",
      "Item price is too high",
      "Shipping price is too high",
      "Need to change payment method",
      "Not required anymore",
      "Some other reason"
    ];

    if (
      selected_order.delivery_status &&
      selected_order.delivery_status.toUpperCase() !== "DELIVERED"
    ) {
      cancel_reasons = [
        ...cancel_reasons,
        "Shipping speed is slow",
        "Need to change shipping address"
      ];
    }

    return (
      <div className="ms-return-page">
        <div className="ms-return-page-header">CANCELLATION</div>
        <div className="ms-return-page-body">
          <div className="ms-return-page-reason-container">
            <div className="ms-return-page-reason-header">Select a reason</div>
            <div className="ms-return-page-reason-body">
              {cancel_reasons.map((reason, index) => (
                <div
                  key={index}
                  className="ms-return-page-reason"
                  style={{
                    backgroundColor:
                      selected_cancel_reason === reason ? "#51b9ed" : "white",
                    color: selected_cancel_reason === reason ? "white" : "black"
                  }}
                  onClick={() =>
                    this.setState({ selected_cancel_reason: reason })
                  }
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>
          <button
            className="ms-return-page-submit"
            onClick={() =>
              selected_cancel_reason !== ""
                ? cancelOrder(selected_order.order_id, selected_cancel_reason, {
                    product: selected_order.product.id,
                    size: selected_order.size,
                    delivery_status:
                      selected_order.delivery_status.toUpperCase() ===
                      "DELIVERED"
                        ? "Return requested"
                        : "Cancelled"
                  })
                : createMessage({
                    info: "Please select a reason for cancellation"
                  })
            }
          >
            Submit
          </button>
          <button
            className="ms-return-page-cancel"
            onClick={() => this.props.history.goBack()}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selected_order: state.orders.selected_order
});

export default connect(mapStateToProps, {
  getOrderDetail,
  cancelOrder,
  createMessage
})(ReturnPage);
