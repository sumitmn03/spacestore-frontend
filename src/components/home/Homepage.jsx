import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getHomeEditableProducts } from "../../actions/products";

export class Homepage extends Component {
  state = {
    run_functions: true
  };

  static propTypes = {
    getHomeEditableProducts: PropTypes.func.isRequired,
    home_editable_products: PropTypes.array.isRequired
  };

  myFirstIndex = 0;
  first_fir_timeout;
  first_sec_timeout;
  first_third_timeout;

  mySecondIndex = 0;
  second_fir_timeout;
  second_sec_timeout;
  second_third_timeout;

  componentDidMount() {
    this.setState({ run_functions: true });
    this.props.getHomeEditableProducts();
    this.first_carousel();
    this.second_carousel();
  }

  componentWillUnmount() {
    this.setState({ run_functions: false });
    if (this.first_fir_timeout) clearTimeout(this.first_fir_timeout);
    if (this.first_sec_timeout) clearTimeout(this.first_sec_timeout);
    if (this.first_third_timeout) clearTimeout(this.first_third_timeout);

    if (this.second_fir_timeout) clearTimeout(this.second_fir_timeout);
    if (this.second_sec_timeout) clearTimeout(this.second_sec_timeout);
    if (this.second_third_timeout) clearTimeout(this.second_third_timeout);
  }

  first_carousel = (myFirstIndex = this.myFirstIndex) => {
    if (!this.state.run_functions) return <Fragment />;
    const { home_editable_products } = this.props;
    let images = document.getElementsByClassName("ms-home-design-pic");
    let main_images = document.getElementsByClassName("ms-home-design-image");

    if (home_editable_products.length > 0) {
      if (images[myFirstIndex]) images[myFirstIndex].style.display = "block";

      this.first_fir_timeout = setTimeout(() => {
        if (main_images[myFirstIndex])
          main_images[myFirstIndex].classList = "ms-home-design-image close";

        this.first_sec_timeout = setTimeout(() => {
          if (images[myFirstIndex]) images[myFirstIndex].style.display = "none";
          if (main_images[myFirstIndex])
            main_images[myFirstIndex].classList = "ms-home-design-image open";

          this.myFirstIndex++;
          if (myFirstIndex >= home_editable_products.length - 1)
            this.myFirstIndex = 0;
          this.first_carousel();
        }, 500);
      }, 5000);
    } else {
      if (!images[myFirstIndex]) {
        this.first_third_timeout = setTimeout(this.first_carousel, 1000);
      }
    }
  };

  second_carousel = (mySecondIndex = this.mySecondIndex) => {
    if (!this.state.run_functions) return <Fragment />;
    const { home_editable_products } = this.props;
    let images = document.getElementsByClassName("ms-home-store-pic");
    let main_images = document.getElementsByClassName("ms-home-store-image");

    if (home_editable_products.length > 0) {
      if (images[mySecondIndex]) images[mySecondIndex].style.display = "block";

      this.first_fir_timeout = setTimeout(() => {
        if (main_images[mySecondIndex])
          main_images[mySecondIndex].classList = "ms-home-store-image close";

        this.first_sec_timeout = setTimeout(() => {
          if (images[mySecondIndex])
            images[mySecondIndex].style.display = "none";
          if (main_images[mySecondIndex])
            main_images[mySecondIndex].classList = "ms-home-store-image open";

          this.mySecondIndex++;
          if (mySecondIndex >= home_editable_products.length - 1)
            this.mySecondIndex = 0;
          this.second_carousel();
        }, 500);
      }, 5000);
    } else {
      if (!images[mySecondIndex]) {
        this.first_third_timeout = setTimeout(this.second_carousel, 1000);
      }
    }
  };

  render() {
    let product_categories = [
      { header: "Coder, Programmer & Nerd" },
      { header: "Motivational / Inspirational" },
      { header: "Sales" },
      { header: "Students" },
      { header: "Nerds" },
      { header: "Vloggers" },
      { header: "Fun" },
      { header: "Couples" }
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
                    No worries, use our easy to use tools to create your own
                    design
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
                <button>Start designing</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ms-home-customize-container">
          {/* <div className="ms-home-customize-header">
            <h3> Select product to customize</h3>
          </div> */}
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
                    <span>
                      {" "}
                      Check out the tutorial on how to use <br /> the editing
                      tools
                    </span>{" "}
                  </div>{" "}
                </div>
                <div className="ms-home-customizer-content">
                  <button>Tutorial</button>
                </div>
              </div>
            </div>
            <div className="ms-home-customize-product">
              <div className="ms-home-customize-product-image">
                {" "}
                <img src={home_editable_products[0].image} alt="product" />
              </div>
              <div className="ms-home-customize-product-name">T - Shirt</div>
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
              <div className="ms-home-store-content">
                {" "}
                <div className="ms-home-store-content-quote">
                  Looking for pre designed <br /> clothes ?
                  <span> Check out our store</span>{" "}
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
        </div>
        {product_categories.map((category, index) => (
          <div key={index} className="ms-home-store-category-container">
            {/* make sure to load only 4 images from database */}
            <div className="ms-home-store-category-header">
              <h3> {category.header}</h3> <button>View more</button>
            </div>
            <div className="ms-home-store-category-product-container">
              {home_editable_products.map((product, index) => (
                <div key={index} className="ms-home-store-category-product">
                  <div className="ms-home-store-category-image-container">
                    <img
                      className="ms-home-store-category-image"
                      src={product.image}
                      alt="product"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* <div className="ms-home-store-category-container">
          <div className="ms-home-store-category-header">
            <h3> Motivational / Inspirational</h3> <button>View more</button>
          </div>
          <div className="ms-home-store-category-product-container">
            {home_editable_products.map((product, index) => (
              <div key={index} className="ms-home-store-category-product">
                <div className="ms-home-store-category-image-container">
                  <img
                    className="ms-home-store-category-image"
                    src={product.image}
                    alt="product"
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    ) : (
      <Fragment />
    );
  }
}

const mapStateToProps = state => ({
  home_editable_products: state.products.home_editable_products
});

export default connect(mapStateToProps, { getHomeEditableProducts })(Homepage);
