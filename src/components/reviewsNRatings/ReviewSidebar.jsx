import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class ReviewSidebar extends Component {
  state = {
    user_name: "",
    form_rating: "",
    review: "",
    status_message: <Fragment />
  };

  componentDidUpdate(prevProps) {
    if (prevProps.product_review_status !== this.props.product_review_status) {
      let status_message;

      switch (this.props.product_review_status) {
        case "just_now_added":
          status_message = (
            <p className="ms-review-sidebar-form-status success">
              Review added successfully
            </p>
          );
          break;

        case "already_exists":
          status_message = (
            <p className="ms-review-sidebar-form-status exists">
              You have already posted a review
            </p>
          );
          break;

        default:
          status_message = <Fragment />;
          break;
      }
      this.setState({ status_message });
    }
  }

  handleOnSubmit = e => {
    e.preventDefault();
    const product = this.props.product.id,
      user = this.props.user.id,
      { user_name, form_rating, review } = this.state;

    if (
      product &&
      user &&
      user_name !== "" &&
      form_rating !== "" &&
      review !== ""
    ) {
      this.props.postProductReview({
        product,
        user,
        user_name,
        rating: form_rating,
        review
      });

      this.setState({
        user_name: "",
        form_rating: "",
        review: ""
      });
    }
  };

  handleOnChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      id,
      image,
      name,
      rating,
      original_price,
      seller_discount
    } = this.props.product;

    const { user_name, form_rating, review, status_message } = this.state;

    const ratings = [5, 4, 3, 2, 1];

    return (
      <div className="ms-review-sidebar">
        <Link to={`/product/${id}`} className="ms-review-sidebar-product-link">
          <div className="ms-review-sidebar-product-container">
            <div>
              <img width="350px" height="350px" src={image} alt="product" />
            </div>
            <div className="ms-review-sidebar-product-name">{name}</div>
            {rating ? (
              <div className="ms-review-sidebar-product-rating">{rating}</div>
            ) : (
              <Fragment />
            )}
            <div className="ms-review-sidebar-product-price-wrapper">
              <span className="ms-review-sidebar-product-current-price">
                ₹{original_price - seller_discount}
              </span>{" "}
              <span className="ms-review-sidebar-product-original-price">
                ₹{original_price}
              </span>
            </div>
          </div>{" "}
        </Link>
        {this.props.isAuthenticated ? (
          <div className="ms-review-sidebar-form-container">
            <form
              className="ms-review-sidebar-form"
              onSubmit={this.handleOnSubmit}
            >
              <div className="ms-review-sidebar-form-component">
                <label>Name</label>
                <input
                  type="text"
                  name="user_name"
                  value={user_name}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="ms-review-sidebar-form-component">
                <label>Rating</label>
                <div className="ms-review-sidebar-form-rating-container">
                  {ratings.map((single_rating, index) => (
                    <span
                      style={{
                        backgroundColor:
                          form_rating === single_rating ? "green" : "grey"
                      }}
                      key={index}
                      onClick={() => {
                        this.setState({ form_rating: single_rating });
                      }}
                    >
                      {single_rating}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ms-review-sidebar-form-component">
                <label>Review</label>
                <textarea
                  rows="4"
                  name="review"
                  value={review}
                  onChange={this.handleOnChange}
                ></textarea>
              </div>
              {status_message}
              <button className="ms-review-sidebar-form-submit">Submit</button>
            </form>
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    );
  }
}

export default ReviewSidebar;
