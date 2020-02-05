import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setNextLink, getMoreProducts } from "../../actions/products";
import MainFilter from "./filter/MainFilter";
import MainMarketPlaceBody from "./marketPlaceBody/MainMarketPlaceBody";

export class MainMarketPlace extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    setNextLink: PropTypes.func.isRequired,
    getMoreProducts: PropTypes.func.isRequired,
    next: PropTypes.string
  };

  render() {
    let {
      products,
      next,
      setNextLink,
      getMoreProducts,
      match,
      history
    } = this.props;

    return (
      <div className="ms-main-marketplace">
        <MainFilter match={match} history={history} />
        <MainMarketPlaceBody
          products={products}
          next={next}
          setNextLink={setNextLink}
          getMoreProducts={getMoreProducts}
          match={match}
          history={history}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  next: state.products.next
});

export default connect(mapStateToProps, {
  setNextLink,
  getMoreProducts
})(MainMarketPlace);
