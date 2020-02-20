import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWishlist, deleteFromWl } from "../../actions/wishlist";
import SingleWishlistProduct from "./SingleWishlistProduct";

export class MainWishlist extends Component {
  static propTypes = {
    getWishlist: PropTypes.func.isRequired,
    deleteFromWl: PropTypes.func.isRequired,
    wishlist: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getWishlist();
  }

  render() {
    const { wishlist, deleteFromWl } = this.props;

    return (
      <div className="ms-wishlist-page">
        <h2 className="ms-wishlist-header"> WISHLIST</h2>
        {wishlist.length < 1 ? (
          <div className="ms-cart-no-product">Your Wishlist is empty !</div>
        ) : (
          <Fragment />
        )}
        {wishlist.map((wishlist_item, index) => (
          <SingleWishlistProduct
            key={index}
            product={wishlist_item.wishlist_product}
            deleteFromWl={deleteFromWl}
            wishlist_id={wishlist_item.id}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wishlist: state.wishlist.wishlist
});

export default connect(mapStateToProps, {
  getWishlist,
  deleteFromWl
})(MainWishlist);
