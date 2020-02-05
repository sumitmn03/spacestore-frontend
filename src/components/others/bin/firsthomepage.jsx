import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getHomeEditableProducts } from "../../actions/products";
import { run_carousel } from "../../myjs/myJs";
import { activate_carousel } from "../../actions/home";
import SingleProductInHome from "./singleProductInHome/SingleProductInHome";

export class Homepage extends Component {
  static propTypes = {
    getHomeEditableProducts: PropTypes.func.isRequired,
    home_editable_products: PropTypes.array.isRequired,
    carousel_is_active: PropTypes.bool.isRequired,
    activate_carousel: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.setState({ run_functions: true });
    this.props.getHomeEditableProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (!this.props.carousel_is_active) {
        this.props.activate_carousel();

        const { home_editable_products } = this.props;

        const design_images = document.getElementsByClassName(
          "ms-home-design-pic"
        );
        const design_main_images = document.getElementsByClassName(
          "ms-home-design-image"
        );

        const store_images = document.getElementsByClassName(
          "ms-home-store-pic"
        );
        const store_main_images = document.getElementsByClassName(
          "ms-home-store-image"
        );

        if (
          home_editable_products.length > 0 &&
          design_images[0] &&
          design_main_images[0]
        ) {
          run_carousel(
            "first",
            home_editable_products,
            design_images,
            design_main_images,
            "ms-home-design-image"
          );
        }

        // if (
        //   home_editable_products.length > 0 &&
        //   store_images[0] &&
        //   store_main_images[0]
        // ) {
        //   run_carousel(
        //     "second",
        //     home_editable_products,
        //     store_images,
        //     store_main_images,
        //     "ms-home-store-image"
        //   );
        // }
      }
    }
  }

  render() {
    let product_categories = [
      { header: "Coder, Programmer & Nerd" },
      { header: "Motivational / Inspirational" },
      { header: "Sales" },
      { header: "Students" },
      { header: "Nerds" },
      { header: "Vloggers" },
      { header: "Fun" },
      { header: "Couples" },
      { header: "Gamers" }
    ];

    const { home_editable_products } = this.props;
    return home_editable_products.length > 0 ? (
      <div className="ms-home-page">
        <div className="ms-home-design">
          <div className="ms-home-design-sidebar">
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
              {home_editable_products.map((product, index) => (
                <div
                  className="ms-home-design-pic"
                  style={{ display: "none" }}
                  key={index}
                >
                  <img
                    className="ms-home-design-image open"
                    src={product.image}
                    alt="product"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="ms-home-design-sidebar">
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
        {/* <div className="ms-home-customize-container">
          <div className="ms-home-customize-product-container">
            <div
              className="ms-home-customize-product last"
              style={{ marginLeft: 0 }}
            >
              <div className="ms-home-customizer-content-wrapper">
                <div className="ms-home-customizer-content">
                  {" "}
                  <div className="ms-home-customizer-content-quote">
                    New to Spacestore ?
                    <span> We've got exciting offers for you</span>{" "}
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="ms-home-customize-product">
              <div className="ms-home-customize-product-image">
                {" "}
                <img src={home_editable_products[0].image} alt="product" />
              </div>
              <div
                className="ms-home-customize-product-name"
                style={{ marginLeft: "-13px" }}
              >
                T - Shirt
              </div>
            </div>
            <div className="ms-home-customize-product">
              <div className="ms-home-customize-product-image">
                {" "}
                <img src={home_editable_products[1].image} alt="product" />
              </div>{" "}
              <div className="ms-home-customize-product-name">Hoodie</div>
            </div>
            <div className="ms-home-customize-product">
              <div className="ms-home-customize-product-image">
                {" "}
                <img src={home_editable_products[2].image} alt="product" />
              </div>{" "}
              <div className="ms-home-customize-product-name">Sweatshirt</div>
            </div>
          </div>
        </div>
        <div className="ms-home-store">
          <div className="ms-home-store-sidebar">
            <div className="ms-home-store-content-wrapper">
              <div className="ms-home-store-content quote">
                {" "}
                <div className="ms-home-store-content-quote">
                  <span className="ms-home-store-content-services">
                    {" "}
                    Cash on delivery available
                  </span>{" "}
                  <span className="ms-home-store-content-services">
                    {" "}
                    Easy returns
                  </span>{" "}
                  <span className="ms-home-store-content-services">
                    {" "}
                    Free delivery on orders above ₹ 999
                  </span>{" "}
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="ms-home-store-center">
            <div className="ms-home-store-pics-container">
              {home_editable_products.map((product, index) => (
                <div
                  className="ms-home-store-pic"
                  style={{ display: "none" }}
                  key={index}
                >
                  <img
                    className="ms-home-store-image open"
                    src={product.image}
                    alt="product"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="ms-home-store-sidebar">
            <div className="ms-home-store-content-wrapper">
              <div className="ms-home-store-content">
                {" "}
                <div className="ms-home-store-content-quote">
                  Your passion is your <br /> fashion
                </div>{" "}
              </div>
              <div className="ms-home-store-content">
                <button>Start shopping</button>
              </div>
            </div>
          </div>
        </div> */}
        <h3 className="ms-home-predesigned-header">
          Cash on delivery & 10 days return policy on predesigned products
        </h3>
        {product_categories.map((category, index) => (
          // <div key={index} className="ms-home-store-category-container">
          //   <div className="ms-home-store-category-header">
          //     <h3> {category.header}</h3> <button>View more</button>
          //   </div>
          //   <div className="ms-home-store-category-product-container">
          //     {home_editable_products.map((product, index) => (
          //       <div key={index} className="ms-home-store-category-product">
          //         <div className="ms-home-store-category-image-container">
          //           <img
          //             className="ms-home-store-category-image"
          //             src={product.image}
          //             alt="product"
          //           />
          //         </div>
          //       </div>
          //     ))}
          //   </div>
          // </div>
          <div className="ms-home-category-body">
            <h3 className="ms-home-category-header">{category.header}</h3>
            <div className="ms-home-category-product-container">
              {home_editable_products.map((product, index) => (
                <SingleProductInHome key={index} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <Fragment />
    );
  }
}

const mapStateToProps = state => ({
  home_editable_products: state.products.home_editable_products,
  carousel_is_active: state.home.carousel_is_active
});

export default connect(mapStateToProps, {
  getHomeEditableProducts,
  activate_carousel
})(Homepage);
