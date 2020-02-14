import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class MainContents extends Component {
  state = {
    image_to_display: "",
    quantity: "1",
    size: ""
  };

  componentDidMount() {
    let auth_page = document.getElementsByClassName("ms-auth-page")[0];
    if (auth_page) auth_page.style.display = "none";
    this.getCurrentProduct();
  }

  getCurrentProduct = () => {
    const { getSingleProduct, match } = this.props;
    getSingleProduct(match.params.id);
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps !== this.props &&
      this.state.image_to_display === "" &&
      this.props.product.image
    )
      this.setState({
        image_to_display: `http://localhost:8000${this.props.product.image}`
      });
  }

  handleImageToDisplay = e => {
    this.setState({ image_to_display: e.target.src });
  };

  render() {
    const {
      id,
      image,
      name,
      rating,
      original_price,
      seller_discount,
      size_n_quantity,
      product_details,
      description,
      reviews,
      q_n_as,
      product_images,
      item_in_wishlist
    } = this.props.product;

    const { image_to_display, quantity, size } = this.state;

    const {
      product,
      createMessage,
      addToCart,
      addToWishlist,
      deleteFromWl,
      isAuthenticated,
      updateCheckout,
      user,
      history
    } = this.props;

    let sizes = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "XXS", "XXXS"],
      temp_size_elems_arr = [],
      temp_size_arr = [],
      services = [
        "Cash on delivery available",
        "10 days return policy",
        "Free shipping on orders above ₹1500/-"
      ];

    temp_size_elems_arr = sizes.map(size =>
      size_n_quantity.map(size_obj => {
        if (
          size === size_obj.size &&
          size_obj.quantity > 0 &&
          !temp_size_arr.includes(size)
        ) {
          temp_size_arr = [...temp_size_arr, size];
          return (
            <span
              key={size_obj.id}
              className="ms-main-marketplace-product-sizes-children"
            >
              {size}
            </span>
          );
        } else {
          return <Fragment key={size_obj.id} />;
        }
      })
    );

    return (
      <div className="ms-product-page-main-contents">
        <div className="ms-product-page-main-first">
          <div className="ms-product-page-images-container">
            <div className="ms-product-page-main-image-nav-container">
              {/* these are the small images to the left of the main image in the product page */}
              {/* this is the front image */}
              <div
                className="ms-product-page-main-image-nav"
                style={{
                  borderColor:
                    image_to_display === `http://localhost:8000${image}`
                      ? "rgb(3, 154, 255)"
                      : "rgb(178, 189, 196)"
                }}
              >
                <img
                  width="60px"
                  height="60px"
                  src={`http://localhost:8000${image}`}
                  alt="product_img"
                  onMouseOver={this.handleImageToDisplay}
                />
              </div>

              {/* these are the extra images like back, left, right etc */}
              {product_images.map(product_img => {
                let img = `http://localhost:8000${product_img.image}`;
                return (
                  <div
                    key={product_img.id}
                    className="ms-product-page-main-image-nav"
                    style={{
                      borderColor:
                        image_to_display === img
                          ? "rgb(3, 154, 255)"
                          : "rgb(178, 189, 196)"
                    }}
                  >
                    <img
                      width="60px"
                      height="60px"
                      src={img}
                      alt="product_img"
                      onMouseOver={this.handleImageToDisplay}
                    />
                  </div>
                );
              })}
            </div>
            {image_to_display !== "" ? (
              <div className="ms-product-page-main-image-container">
                <img
                  // width="450px"
                  // height="490px"
                  src={image_to_display}
                  alt="product_img"
                />
              </div>
            ) : (
              <Fragment />
            )}
          </div>

          <div className="ms-product-page-main-info">
            <h2 className="ms-product-page-main-second-name">{name}</h2>
            {rating ? (
              <div className="ms-product-page-rating">{rating}</div>
            ) : (
              <Fragment />
            )}
            <div className="ms-product-page-price-wrapper">
              <span className="ms-product-page-current-price">
                ₹{original_price - seller_discount}
              </span>
              <span className="ms-product-page-original-price">
                ₹{original_price}
              </span>
            </div>
            <div className="ms-product-page-sizes">
              <span className="ms-product-page-sizes-header">
                Available sizes:
              </span>
              {temp_size_elems_arr}
            </div>
          </div>

          <div className="ms-product-page-main-button-container">
            <div className="ms-product-page-main-button">
              <div className="ms-product-page-main-button-quantity">
                <span>Quantity</span>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="ms-product-page-main-button-size">
                <button>Size</button>
                <div className="ms-product-page-main-button-size-content">
                  {temp_size_arr.map((single_size, index) => (
                    <li
                      key={index}
                      style={{
                        backgroundColor:
                          single_size === size ? "#51b9ed" : "white",
                        color: single_size === size ? "white" : "black"
                      }}
                      onMouseOver={e => {
                        e.target.style.backgroundColor =
                          single_size === size ? "#51b9ed" : "grey";
                        e.target.style.color = "white";
                      }}
                      onMouseOut={e => {
                        e.target.style.backgroundColor =
                          single_size === size ? "#51b9ed" : "white";
                        e.target.style.color =
                          single_size === size ? "white" : "black";
                      }}
                      onClick={() => this.setState({ size: single_size })}
                    >
                      {single_size}
                    </li>
                  ))}
                </div>
              </div>
              <br />
              <br />
              <button
                className="ms-product-page-main-button-atc"
                onClick={() => {
                  if (quantity === "" || quantity === "0") {
                    createMessage({ error: "Quantity must be 1 or more" });
                  } else if (size === "") {
                    createMessage({ error: "select size" });
                  } else {
                    addToCart(id, user.id, size, quantity);
                    history.push("/cart");
                  }
                }}
              >
                Add to cart
              </button>
              <button
                className="ms-product-page-main-button-bn"
                onClick={() => {
                  if (quantity === "" || quantity === "0") {
                    createMessage({ error: "Quantity must be 1 or more" });
                  } else if (size === "") {
                    createMessage({ error: "select size" });
                  } else {
                    updateCheckout(user.checkout_id, {
                      user: user.id,
                      cart_or_single: "single",
                      product: product.id,
                      size,
                      quantity
                    });
                    history.push("/checkout");
                  }
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className="ms-product-page-main-second">
          <div className="ms-product-page-services">
            <h2 className="ms-product-page-detail-header-main">Services</h2>
            <div className="ms-product-page-services-body">
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </div>
          </div>
        </div>
        <button
          className="ms-product-page-wishlist-btn"
          // onMouseOver={e => {
          //   e.target.style.backgroundColor = item_in_wishlist
          //     ? "rgb(245, 26, 26)"
          //     : "#51b9ed";
          //   e.target.style.color = "white";
          // }}
          // onMouseOut={e => {
          //   e.target.style.backgroundColor = "white";
          //   e.target.style.color = "black";
          // }}
          onClick={() => {
            if (item_in_wishlist) {
              deleteFromWl(item_in_wishlist.id);
              createMessage({ success: "Item removed from wishlist" });
            } else {
              addToWishlist(id);
              createMessage({ success: "Item added to wishlist" });
            }
            this.getCurrentProduct();
          }}
        >
          {item_in_wishlist ? "Remove from wishlist" : " Add to wishlist"}
        </button>

        <div className="ms-product-page-detail-container">
          <h2 className="ms-product-page-detail-header-main">Details</h2>
          <div className="ms-product-page-detail-wrapper">
            {product_details.map((detail, i) => (
              <div key={i} className="ms-product-page-detail">
                <span className="ms-product-page-detail-header">
                  {detail.header}
                </span>{" "}
                <span className="ms-product-page-detail-value">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ms-product-page-description">
          <h2 className="ms-product-page-detail-header-main">Description</h2>
          <div className="ms-product-page-description-body"> {description}</div>
        </div>

        <div className="ms-product-page-review-container">
          <h2 className="ms-product-page-detail-header-main">Reviews</h2>
          <div className="ms-product-page-review-body">
            {reviews.map(review => (
              <div key={review.id} className="ms-product-page-review">
                <div>
                  <span className="ms-product-page-review-username">
                    {review.user_name}
                  </span>{" "}
                  <span className="ms-product-page-review-rating">
                    {review.rating} / 5
                  </span>
                </div>
                <div className="ms-product-page-review-review">
                  {review.review}
                </div>
              </div>
            ))}
            {reviews.length < 1 ? (
              <div className="ms-product-page-noreviews">
                No reviews found for this product.
              </div>
            ) : (
              <Fragment />
            )}
          </div>
          <div className="ms-product-page-footer">
            {reviews.length > 0 ? (
              <span>
                <Link
                  to={`/product/reviews_n_ratings/${product.id}`}
                  className="ms-product-page-footer-link"
                >
                  See all reviews
                </Link>
              </span>
            ) : (
              <Fragment />
            )}
            {isAuthenticated ? (
              <span>
                <Link
                  to={`/product/reviews_n_ratings/${product.id}`}
                  className="ms-product-page-footer-link"
                >
                  Write a review
                </Link>
              </span>
            ) : (
              <Fragment />
            )}
          </div>
        </div>

        <div className="ms-product-page-qna">
          <h2 className="ms-product-page-detail-header-main">
            Qustions and answers
          </h2>
          <div className="ms-product-page-qna-body">
            {q_n_as.map(qna => (
              <div key={qna.id} className="ms-product-page-qna-container">
                <div className="ms-product-page-qna-q">
                  <span className="ms-product-page-qna-q-f"> Question: </span>
                  <span className="ms-product-page-qna-q-s">
                    {" "}
                    {qna.question}{" "}
                  </span>
                </div>
                <div className="ms-product-page-qna-a">
                  <span className="ms-product-page-qna-a-f">Answer: </span>
                  <span className="ms-product-page-qna-a-s">
                    {" "}
                    {qna.answer}{" "}
                  </span>
                </div>
              </div>
            ))}
            {q_n_as.length <= 0 ? (
              <div className="ms-product-page-noreviews">
                No Questions and answers found for this product.
              </div>
            ) : (
              <Fragment />
            )}
          </div>
          <div className="ms-product-page-footer">
            {q_n_as.length > 0 ? (
              <span>
                <Link
                  to={`/product/qna/${product.id}`}
                  className="ms-product-page-footer-link"
                >
                  See all Q&A's
                </Link>
              </span>
            ) : (
              <Fragment />
            )}

            {isAuthenticated ? (
              <span>
                <Link
                  to={`/product/qna/${product.id}`}
                  className="ms-product-page-footer-link"
                >
                  Post a question
                </Link>
              </span>
            ) : (
              <Fragment />
            )}
          </div>
        </div>
        {/* 
          <h2 className="ms-product-page-main-second-name">{name}</h2>
          {rating ? (
            <div className="ms-product-page-rating">{rating}</div>
          ) : (
            <Fragment />
          )}
          <div className="ms-product-page-price-wrapper">
            <span className="ms-product-page-current-price">
              ₹{original_price - seller_discount}
            </span>{" "}
            <span className="ms-product-page-original-price">
              ₹{original_price}
            </span>
          </div>
          <div className="ms-product-page-sizes">
            <span className="ms-product-page-sizes-header">
              Available sizes:
            </span>
            {temp_size_elems_arr}
          </div>
          <div className="ms-product-page-services">
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </div>
          
          <button
            className="ms-product-page-wishlist-btn"
            onMouseOver={e => {
              e.target.style.backgroundColor = item_in_wishlist
                ? "rgb(245, 26, 26)"
                : "#51b9ed";
              e.target.style.color = "white";
            }}
            onMouseOut={e => {
              e.target.style.backgroundColor = "white";
              e.target.style.color = "black";
            }}
            onClick={() => {
              if (item_in_wishlist) {
                deleteFromWl(item_in_wishlist.id);
                createMessage({ success: "Item removed from wishlist" });
              } else {
                addToWishlist(id);
                createMessage({ success: "Item added to wishlist" });
              }
              this.getCurrentProduct();
            }}
          >
            {item_in_wishlist ? "Remove from wishlist" : " Add to wishlist"}
          </button>
          <div className="ms-product-page-detail-container">
            <h2 className="ms-product-page-header">Details</h2>
            {product_details.map((detail, i) => (
              <div key={i} className="ms-product-page-detail">
                <span className="ms-product-page-detail-header">
                  {detail.header}
                </span>{" "}
                <span className="ms-product-page-detail-value">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          <div className="ms-product-page-description">
            <h2 className="ms-product-page-header">Description</h2>
            <div> {description}</div>
          </div>

          <div className="ms-product-page-review-container">
            <h2 className="ms-product-page-header">Reviews</h2>
            <div>
              {reviews.map(review => (
                <div key={review.id} className="ms-product-page-review">
                  <div>
                    <span className="ms-product-page-review-username">
                      {review.user_name}
                    </span>{" "}
                    <span className="ms-product-page-review-rating">
                      {review.rating} / 5
                    </span>
                  </div>
                  <div className="ms-product-page-review-review">
                    {review.review}
                  </div>
                </div>
              ))}
              {reviews.length <= 0 ? (
                <div className="ms-product-page-noreviews">
                  No reviews found for this product.
                </div>
              ) : (
                <Fragment />
              )}
            </div>
            <div className="ms-product-page-footer">
              {reviews.length > 0 ? (
                <span>
                  <Link
                    to={`/product/reviews_n_ratings/${product.id}`}
                    className="ms-product-page-footer-link"
                  >
                    See all reviews
                  </Link>
                </span>
              ) : (
                <Fragment />
              )}
              {isAuthenticated ? (
                <span>
                  <Link
                    to={`/product/reviews_n_ratings/${product.id}`}
                    className="ms-product-page-footer-link"
                  >
                    Write a review
                  </Link>
                </span>
              ) : (
                <Fragment />
              )}
            </div>
          </div>

          <div className="ms-product-page-qna">
            <h2 className="ms-product-page-header">Qustions and answers</h2>
            <div>
              {q_n_as.map(qna => (
                <div key={qna.id}>
                  <div className="ms-product-page-qna-q">
                    <span className="ms-product-page-qna-q-f"> Question: </span>
                    <span className="ms-product-page-qna-q-s">
                      {" "}
                      {qna.question}{" "}
                    </span>
                  </div>
                  <div className="ms-product-page-qna-a">
                    <span className="ms-product-page-qna-a-f">Answer: </span>
                    <span className="ms-product-page-qna-a-s">
                      {" "}
                      {qna.answer}{" "}
                    </span>
                  </div>
                </div>
              ))}
              {q_n_as.length <= 0 ? (
                <div className="ms-product-page-noreviews">
                  No Questions and answers found for this product.
                </div>
              ) : (
                <Fragment />
              )}
            </div>
            <div className="ms-product-page-footer">
              {q_n_as.length > 0 ? (
                <span>
                  <Link
                    to={`/product/qna/${product.id}`}
                    className="ms-product-page-footer-link"
                  >
                    See all questions and answers
                  </Link>
                </span>
              ) : (
                <Fragment />
              )}

              {isAuthenticated ? (
                <span>
                  <Link
                    to={`/product/qna/${product.id}`}
                    className="ms-product-page-footer-link"
                  >
                    Post a question
                  </Link>
                </span>
              ) : (
                <Fragment />
              )}
            </div>
        </div> */}
      </div>
    );
  }
}

export default MainContents;
