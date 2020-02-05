import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MainSearchInput from "./MainSearchInput";

export class SearchInput extends Component {
  static propTypes = {
    queries: PropTypes.object.isRequired,
    order_by: PropTypes.string.isRequired
  };

  render() {
    let { queries, order_by } = this.props;

    return <MainSearchInput queries={queries} order_by={order_by} />;
  }
}

const mapStateToProps = state => ({
  queries: state.products.queries,
  order_by: state.products.order_by
});

export default connect(mapStateToProps)(SearchInput);
