import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createMessage } from "../../actions/messages";
import { getSingleProduct } from "../../actions/product";
import { addToCart } from "../../actions/cart";
import { addToWishlist, deleteFromWl } from "../../actions/wishlist";
import { updateCheckout } from "../../actions/checkout";
import MainContents from "./mainContents/MainContents";
// import ExtraContents from "./extraContents/ExtraContents";

export class ProductPage extends Component {
  static propTypes = {
    createMessage: PropTypes.func.isRequired,
    getSingleProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    addToWishlist: PropTypes.func.isRequired,
    deleteFromWl: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    updateCheckout: PropTypes.func.isRequired
  };

  render() {
    const {
      product,
      match,
      createMessage,
      getSingleProduct,
      addToCart,
      addToWishlist,
      deleteFromWl,
      isAuthenticated,
      updateCheckout,
      history
    } = this.props;

    let user = this.props.user;

    user = user ? user : {};

    return (
      <div className="ms-product-page">
        <MainContents
          product={product}
          match={match}
          createMessage={createMessage}
          getSingleProduct={getSingleProduct}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          deleteFromWl={deleteFromWl}
          isAuthenticated={isAuthenticated}
          updateCheckout={updateCheckout}
          user={user}
          history={history}
        />
        {/* <ExtraContents /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  createMessage,
  getSingleProduct,
  addToCart,
  addToWishlist,
  deleteFromWl,
  updateCheckout
})(ProductPage);
