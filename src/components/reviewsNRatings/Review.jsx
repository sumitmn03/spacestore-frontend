import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProductReviews, postProductReview } from "../../actions/review";
import ReviewSidebar from "./ReviewSidebar";
import MainReview from "./MainReview";

export class Review extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    getProductReviews: PropTypes.func.isRequired,
    postProductReview: PropTypes.func.isRequired,
    product_review_status: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { getProductReviews, match } = this.props;
    getProductReviews(match.params.id);
    window.scrollTo(0, 0);
  }

  render() {
    const {
      product,
      user,
      postProductReview,
      product_review_status,
      isAuthenticated
    } = this.props;

    return (
      <div className="ms-review-page">
        <ReviewSidebar
          product={product}
          user={user}
          postProductReview={postProductReview}
          product_review_status={product_review_status}
          isAuthenticated={isAuthenticated}
        />
        <MainReview product={product} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.review.product,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  product_review_status: state.review.product_review_status
});

export default connect(mapStateToProps, {
  getProductReviews,
  postProductReview
})(Review);
