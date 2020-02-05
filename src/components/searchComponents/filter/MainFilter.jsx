import React, { Component } from "react";

export class MainFilter extends Component {
  state = {
    show_elem: [],
    type_queries: [],
    color_queries: [],
    design_type_queries: [],
    size_queries: []
  };

  componentDidMount() {
    const {
      type_query,
      color_query,
      design_type_query,
      size_query
    } = this.props.match.params;

    this.handlePrevOptions(
      type_query,
      color_query,
      design_type_query,
      size_query
    );
  }

  handlePrevOptions = (
    type_query,
    color_query,
    design_type_query,
    size_query
  ) => {
    this.setState(
      {
        type_queries: type_query.trim().split(","),
        color_queries: color_query.trim().split(","),
        design_type_queries: design_type_query.trim().split(","),
        size_queries: size_query.trim().split(",")
      },
      () => {}
    );
  };

  set_option_visibility = index => {
    let show_elem = this.state.show_elem;
    if (show_elem.includes(index)) {
      this.setState({
        show_elem: show_elem.filter(elem => elem !== index)
      });
    } else {
      this.setState({
        show_elem: [...show_elem, index]
      });
    }
  };

  handleFilter = (e, filter) => {
    const { checked, value } = e.target;

    let {
      type_queries,
      color_queries,
      design_type_queries,
      size_queries
    } = this.state;

    let key = "";
    let queries = [];

    switch (filter) {
      case "Product type":
        key = "type_queries";
        queries = type_queries;
        break;
      case "Color":
        key = "color_queries";
        queries = color_queries;
        break;
      case "Design type":
        key = "design_type_queries";
        queries = design_type_queries;
        break;
      case "Size":
        key = "size_queries";
        queries = size_queries;
        break;

      default:
        console.log("something else from MainFilter.jsx 71");
        break;
    }

    if (checked && !queries.includes(value)) {
      queries = [...queries, value];
    } else if (!checked) {
      queries = queries.filter(query => query !== value);
    }

    this.setState({ [key]: queries }, () => {
      this.handleFinalSearch();
    });
  };

  handleFinalSearch = () => {
    const { history } = this.props;

    const { order_by, search_query } = this.props.match.params;

    const {
      type_queries,
      color_queries,
      design_type_queries,
      size_queries
    } = this.state;

    history.push(
      `/search/ ${order_by.trim()}/ ${search_query.trim()}/ ${type_queries}/ ${color_queries}/ ${design_type_queries}/ ${size_queries}`
    );
  };

  render() {
    let filters = [
      {
        header: "Product type",
        state_header: "type_queries",
        options: ["T - shirt", "Sweatshirt", "Hoodie"],
        values: ["tshirt", "Sweatshirt", "Hoodie"]
      },
      {
        header: "Color",
        state_header: "color_queries",
        options: ["Blue", "White", "Darkgreen", "Yellow"],
        values: ["Blue", "White", "Darkgreen", "Yellow"]
      },
      {
        header: "Design type",
        state_header: "design_type_queries",
        options: [
          "Students",
          "Programmers & coders",
          "Nerd",
          "Sales",
          "Motivational "
        ],
        values: [
          "Students",
          "Programmers & coders",
          "Nerd",
          "Sales",
          "Motivational "
        ]
      },
      {
        header: "Size",
        state_header: "size_queries",
        options: ["XXL", "XL", "L", "M", "S", "XS", "XXS"],
        values: ["XXL", "XL", "L", "M", "S", "XS", "XXS"]
      }
    ];
    return (
      <div className="ms-marketplace-filter-component">
        <h3 className="ms-marketplace-filter-header">Filters</h3>
        <div className="ms-marketplace-filter-container">
          {filters.map((single_filter, index) => (
            <div className="ms-marketplace-filter" key={index}>
              <div
                className="ms-marketplace-filter-name"
                onClick={() => {
                  this.set_option_visibility(index);
                }}
              >
                {single_filter.header}
              </div>
              <div
                className="ms-marketplace-filter-options-container"
                style={{
                  display: this.state.show_elem.includes(index)
                    ? "block"
                    : "none"
                }}
              >
                {single_filter.options.map((option, i) => (
                  <li key={i} className="ms-marketplace-filter-option">
                    <span> {option}</span>{" "}
                    <input
                      type="checkbox"
                      name={"filter_option" + filters + single_filter}
                      id={"filter_option" + filters + single_filter}
                      value={single_filter.values[i]}
                      checked={this.state[single_filter.state_header].includes(
                        single_filter.values[i]
                      )}
                      onChange={e => {
                        this.handleFilter(e, single_filter.header);
                      }}
                    />
                  </li>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MainFilter;
