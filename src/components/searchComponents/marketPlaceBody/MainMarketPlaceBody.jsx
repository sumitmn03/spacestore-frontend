import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts } from "../../../actions/products";

import SingleProductViewInMarketPlace from "./singleProductViewInMarketPlace/SingleProductViewInMarketPlace";

export class MainMarketPlaceBody extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    let { products } = this.props;

    let sort_by = ["recommended", "low to high", "high to low"];

    return (
      <div className="ms-main-marketplace-body-wrapper">
        <div className="ms-main-marketplace-header">
          Sort By{" "}
          <span>
            <select className="ms-main-marketplace-sort-by-value">
              {sort_by.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </span>
        </div>
        {products.map((product, index) => (
          <SingleProductViewInMarketPlace key={index} product={product} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products
});

export default connect(mapStateToProps, { getProducts })(MainMarketPlaceBody);
