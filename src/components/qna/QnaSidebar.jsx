import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class QnaSidebar extends Component {
  state = {
    question: "",
    status_message: <Fragment />
  };

  componentDidUpdate(prevProps) {
    if (prevProps.product_qna_status !== this.props.product_qna_status) {
      let status_message;

      switch (this.props.product_qna_status) {
        case "just_now_added":
          status_message = (
            <p className="ms-qna-sidebar-form-status success">
              Question posted successfully. We will notify you with an answer.
            </p>
          );
          break;
        case "limit_crossed":
          status_message = (
            <p className="ms-qna-sidebar-form-status exists">
              You can post upto 5 questions on a single <br /> product
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
      { question } = this.state;

    if (product && user && question !== "") {
      this.props.postProductQna({
        product,
        user,
        question
      });

      this.setState({
        question: ""
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

    const { question, status_message } = this.state;

    const { isAuthenticated } = this.props;

    return (
      <div className="ms-qna-sidebar">
        <Link to={`/product/${id}`} className="ms-qna-sidebar-product-link">
          <div className="ms-qna-sidebar-product-container">
            <div>
              <img width="350px" height="350px" src={image} alt="product" />
            </div>
            <div className="ms-qna-sidebar-product-name">{name}</div>
            {rating ? (
              <div className="ms-qna-sidebar-product-rating">{rating}</div>
            ) : (
              <Fragment />
            )}
            <div className="ms-qna-sidebar-product-price-wrapper">
              <span className="ms-qna-sidebar-product-current-price">
                ₹{original_price - seller_discount}
              </span>{" "}
              <span className="ms-qna-sidebar-product-original-price">
                ₹{original_price}
              </span>
            </div>
          </div>
        </Link>
        {isAuthenticated ? (
          <div className="ms-qna-sidebar-form-container">
            <form
              className="ms-qna-sidebar-form"
              onSubmit={this.handleOnSubmit}
            >
              <div className="ms-qna-sidebar-form-component">
                <label>Question</label>
                <textarea
                  rows="4"
                  name="question"
                  value={question}
                  onChange={this.handleOnChange}
                ></textarea>
              </div>
              {status_message}
              <button className="ms-qna-sidebar-form-submit">Submit</button>
            </form>
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    );
  }
}

export default QnaSidebar;
