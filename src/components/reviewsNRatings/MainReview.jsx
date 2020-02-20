import React, { Component } from "react";

export class MainReview extends Component {
  render() {
    const { reviews } = this.props.product;

    return (
      <div className="ms-review-main">
        <div className="ms-review-main-header">REVIEWS & RATINGS</div>
        <div className="ms-review-main-review-container">
          {reviews.map(review => (
            <div key={review.id} className="ms-review-main-review">
              <div>
                <span className="ms-review-main-review-username">
                  {review.user_name}
                </span>{" "}
                <span className="ms-review-main-review-rating">
                  {review.rating} / 5
                </span>
              </div>
              <div className="ms-review-main-review-review">
                {review.review}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MainReview;
