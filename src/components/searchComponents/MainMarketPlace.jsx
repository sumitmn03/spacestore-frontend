import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setNextLink, getMoreProducts } from "../../actions/products";
import MainFilter from "./filter/MainFilter";
import MainMarketPlaceBody from "./marketPlaceBody/MainMarketPlaceBody";

export class MainMarketPlace extends Component {
  state = {
    show_order_by: false,
    show_filter: false,
    order_by_value: "recommended"
  };

  static propTypes = {
    products: PropTypes.array.isRequired,
    setNextLink: PropTypes.func.isRequired,
    getMoreProducts: PropTypes.func.isRequired,
    next: PropTypes.string
  };

  componentDidMount() {
    const { order_by } = this.props.match.params;
    this.handlePrevOptions(order_by);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match !== this.props.match) {
      const { order_by } = this.props.match.params;
      this.handlePrevOptions(order_by);
    }
  }

  handlePrevOptions = order_by => {
    // handle sorting / order by options
    let order_by_value;
    switch (order_by.trim()) {
      case "-rating":
        order_by_value = "recommended";
        break;

      case "current_price":
        order_by_value = "low to high";
        break;

      case "-current_price":
        order_by_value = "high to low";
        break;

      case "-seller_discount":
        order_by_value = "high discount";
        break;

      default:
        order_by_value = "recommended";
        break;
    }

    this.setState({ order_by_value });
  };

  handleSortBy = value => {
    this.setState({ order_by: value }, () => {
      const { history } = this.props;

      const {
        search_query,
        type_query,
        color_query,
        design_type_query,
        size_query
      } = this.props.match.params;

      let order_by_value;
      switch (this.state.order_by) {
        case "recommended":
          order_by_value = "-rating";
          break;

        case "low to high":
          order_by_value = "current_price";
          break;

        case "high to low":
          order_by_value = "-current_price";
          break;

        case "high discount":
          order_by_value = "-seller_discount";
          break;

        default:
          order_by_value = "-rating";
          break;
      }

      history.push(
        `/search/ ${order_by_value.trim()}/ ${search_query.trim()}/ ${type_query.trim()}/ ${color_query.trim()}/ ${design_type_query.trim()}/ ${size_query.trim()}`
      );
    });
  };

  render() {
    let {
      products,
      next,
      setNextLink,
      getMoreProducts,
      match,
      history
    } = this.props;

    const { show_order_by, show_filter, order_by_value } = this.state;

    let order_by = [
      "recommended",
      "low to high",
      "high to low",
      "high discount"
    ];

    return (
      <div className="ms-main-marketplace">
        {window.innerWidth < "992" ? (
          show_filter ? (
            <div
              className="ms-main-marketplace-header-filter-back small"
              onClick={() => this.setState({ show_filter: false })}
            >
              Go Back
            </div>
          ) : (
            <div className="ms-main-marketplace-header-small small">
              <div
                className="ms-main-marketplace-header-small-comp first"
                onClick={() => this.setState({ show_filter: true })}
              >
                Filter
              </div>

              <div
                className="ms-main-marketplace-header-small-comp"
                onClick={() => this.setState({ show_order_by: true })}
              >
                Sort by
              </div>

              {/* this is an absolute positioned element (Sort by component) which appears when user clicks on sory by button */}

              <div
                className="ms-main-marketplace-sortby-comp-page"
                style={{
                  display: show_order_by ? "block" : "none"
                }}
                onClick={() => this.setState({ show_order_by: false })}
              >
                <div className="ms-main-marketplace-sortby-comp-cont">
                  {order_by.map((single_order_by, index) => (
                    <div
                      key={index}
                      className="ms-main-marketplace-sortby-comp"
                      style={{
                        backgroundColor:
                          order_by_value === single_order_by
                            ? "#51b9ed"
                            : "white",
                        color:
                          order_by_value === single_order_by ? "white" : "black"
                      }}
                      value={single_order_by}
                      onClick={e => this.handleSortBy(single_order_by)}
                    >
                      {single_order_by}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        ) : (
          <Fragment />
        )}

        <div
          className="ms-main-marketplace-filter-container"
          style={{
            display:
              show_filter || window.innerWidth >= "992" ? "block" : "none"
          }}
        >
          <MainFilter match={match} history={history} />
        </div>
        <div style={{ display: show_filter ? "none" : "block" }}>
          <MainMarketPlaceBody
            products={products}
            next={next}
            setNextLink={setNextLink}
            getMoreProducts={getMoreProducts}
            match={match}
            history={history}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  next: state.products.next
});

export default connect(mapStateToProps, {
  setNextLink,
  getMoreProducts
})(MainMarketPlace);
