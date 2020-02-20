import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { run_carousel } from "../../myjs/myJs";
import { activate_carousel, getHomeProducts } from "../../actions/home";
import SingleProductInHome from "./singleProductInHome/SingleProductInHome";
import InfiniteScroll from "react-infinite-scroller";

export class Homepage extends Component {
  static propTypes = {
    carousel_is_active: PropTypes.bool.isRequired,
    activate_carousel: PropTypes.func.isRequired,
    home_products: PropTypes.array.isRequired,
    carousel_products: PropTypes.array.isRequired,
    getHomeProducts: PropTypes.func.isRequired,
    next: PropTypes.string
  };

  componentDidUpdate(prevProps) {
    const { carousel_products } = this.props;

    if (
      prevProps !== this.props &&
      !this.props.carousel_is_active &&
      carousel_products.length > 0
    ) {
      const design_images = document.getElementsByClassName(
        "ms-home-design-pic"
      );
      const design_main_images = document.getElementsByClassName(
        "ms-home-design-image"
      );

      if (design_images[0] && design_main_images[0]) {
        run_carousel(
          "first",
          carousel_products,
          design_images,
          design_main_images,
          "ms-home-design-image"
        );
        this.props.activate_carousel();
      }
    }
  }

  loadMoreProducts = () => {
    const { next, getHomeProducts } = this.props;
    if (next !== "") getHomeProducts(next);
  };

  render() {
    // let product_categories = [
    //   { header: "Coder, Programmer & Nerd" },
    //   { header: "Motivational / Inspirational" },
    //   { header: "Sales" },
    //   { header: "Students" },
    //   { header: "Nerds" },
    //   { header: "Vloggers" },
    //   { header: "Fun" },
    //   { header: "Couples" },
    //   { header: "Gamers" }
    // ];

    const { next, carousel_products, home_products } = this.props;
    return (
      <div className="ms-home-page">
        <div className="ms-home-design">
          <div className="ms-home-design-sidebar ms-not-small">
            <div className="ms-home-design-content-wrapper first">
              <div className="ms-home-design-content">
                {" "}
                <div className="ms-home-design-content-quote">
                  Tired of looking for clothes of your type ? <br />
                  <span>
                    {" "}
                    Use our easy tools to create your own design
                  </span>{" "}
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="ms-home-design-center">
            <div className="ms-home-design-pics-container">
              {carousel_products.map((product, index) => (
                <div
                  className="ms-home-design-pic"
                  style={{ display: "none" }}
                  key={index}
                >
                  <img
                    className="ms-home-design-image open"
                    src={product.product.image}
                    alt="product"
                  />
                </div>
              ))}
            </div>
            <div className="ms-home-start-desig-btn-cont ms-small">
              <Link to="/design">
                <button>Start designing</button>
              </Link>
            </div>
          </div>
          <div className="ms-home-design-sidebar ms-not-small">
            <div className="ms-home-design-content-wrapper">
              <div className="ms-home-design-content">
                {" "}
                <div className="ms-home-design-content-quote">
                  Let your fashion describe <br /> who you are
                </div>{" "}
              </div>
              <div className="ms-home-design-content">
                <Link to="/design">
                  <button>Start designing</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <h3 className="ms-home-predesigned-header">
          Cash on delivery & 10 days return policy on predesigned products
        </h3> */}
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMoreProducts}
          hasMore={next !== null}
          loader={<div key={0}>Loading ...</div>}
        >
          {home_products.map((category, index) => (
            <div key={index} className="ms-home-category-body">
              <h3 className="ms-home-category-header">
                {category[0].category}
                <button
                  className="ms-home-category-more"
                  onClick={() => {
                    this.props.history.push(
                      `/search/-rating/ / / /${category[0].category}/ `
                    );
                  }}
                >
                  View more
                </button>
              </h3>
              <div className="ms-home-category-product-container">
                {category.map((product, index) => (
                  <SingleProductInHome key={index} product={product.product} />
                ))}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carousel_is_active: state.home.carousel_is_active,
  home_products: state.home.products,
  carousel_products: state.home.carousel_products,
  next: state.home.next
});

export default connect(mapStateToProps, {
  activate_carousel,
  getHomeProducts
})(Homepage);
