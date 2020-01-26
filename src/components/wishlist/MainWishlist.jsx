import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWishlist, deleteFromWl } from "../../actions/wishlist";
import { addToCart } from "../../actions/cart";
import SingleWishlistProduct from "./SingleWishlistProduct";

export class MainWishlist extends Component {
  static propTypes = {
    getWishlist: PropTypes.func.isRequired,
    deleteFromWl: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    wishlist: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getWishlist();
  }

  render() {
    const { wishlist, deleteFromWl, addToCart } = this.props;

    return (
      <div className="ms-wishlist-page">
        <div className="ms-wishlist-header">Wishlist</div>
        {wishlist.map((wishlist_item, index) => (
          <SingleWishlistProduct
            key={index}
            product={wishlist_item.wishlist_product}
            deleteFromWl={deleteFromWl}
            wishlist_id={wishlist_item.id}
            addToCart={addToCart}
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
  deleteFromWl,
  addToCart
})(MainWishlist);
