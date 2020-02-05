import React, { Component } from "react";
import SingleProductViewInMarketPlace from "./singleProductViewInMarketPlace/SingleProductViewInMarketPlace";
import InfiniteScroll from "react-infinite-scroller";

export class MainMarketPlaceBody extends Component {
  state = {
    order_by: "recommended"
  };
  componentDidMount() {
    const {
      order_by,
      search_query,
      type_query,
      color_query,
      design_type_query,
      size_query
    } = this.props.match.params;

    this.handlePrevOptions(
      order_by,
      search_query,
      type_query,
      color_query,
      design_type_query,
      size_query
    );

    this.props.setNextLink(
      order_by.trim(),
      search_query.trim(),
      type_query.trim(),
      color_query.trim(),
      design_type_query.trim(),
      size_query.trim()
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match !== this.props.match) {
      const {
        order_by,
        search_query,
        type_query,
        color_query,
        design_type_query,
        size_query
      } = this.props.match.params;

      this.props.setNextLink(
        order_by.trim(),
        search_query.trim(),
        type_query.trim(),
        color_query.trim(),
        design_type_query.trim(),
        size_query.trim()
      );
    }
  }

  handlePrevOptions = (
    order_by,
    search_query,
    type_query,
    color_query,
    design_type_query,
    size_query
  ) => {
    // handle sorting / order by options
    let order_by_value;
    switch (order_by.trim()) {
      case "-rating":
        order_by_value = "recommended";
        break;

      case "original_price":
        order_by_value = "low to high";
        break;

      case "-original_price":
        order_by_value = "high to low";
        break;

      case "-seller_discount":
        order_by_value = "high discount";
        break;

      default:
        order_by_value = "recommended";
        break;
    }

    this.setState({ order_by: order_by_value });
  };

  handleSortBy = e => {
    this.setState({ order_by: e.target.value }, () => {
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
          order_by_value = "original_price";
          break;

        case "high to low":
          order_by_value = "-original_price";
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

  loadMoreProducts = () => {
    const { next, getMoreProducts } = this.props;
    if (next !== "") getMoreProducts(next);
  };

  render() {
    let { products, next } = this.props;

    let order_by = [
      "recommended",
      "low to high",
      "high to low",
      "high discount"
    ];

    return (
      <div>
        <div className="ms-main-marketplace-body">
          <div className="ms-main-marketplace-header">
            Sort By{" "}
            <span>
              <select
                onChange={this.handleSortBy}
                className="ms-main-marketplace-sort-by-value"
                value={this.state.order_by}
              >
                {order_by.map((x, index) => (
                  <option key={index} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMoreProducts}
            hasMore={next !== null}
            loader={<div key={0}>Loading ...</div>}
          >
            {products.length > 0 ? (
              products.map((product, index) => (
                <SingleProductViewInMarketPlace key={index} product={product} />
              ))
            ) : (
              <div className="ms-main-marketplace-noproducts">
                Oops ! No products found...
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default MainMarketPlaceBody;
