import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { alert, messages } = this.props;

    if (messages !== prevProps.messages) {
      if (messages.success) {
        alert.success(messages.success);
      } else if (messages.info) {
        alert.info(messages.info);
      } else if (messages.error) {
        alert.error(messages.error);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
