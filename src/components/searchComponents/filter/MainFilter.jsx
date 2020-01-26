import React, { Component } from "react";

export class MainFilter extends Component {
  state = {
    show_elem: []
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

  render() {
    let filters = [
      {
        header: "Product type",
        options: ["T - shirt", "Sweatshirt", "Hoodie"]
      },
      { header: "Color", options: ["Black", "White", "Blue"] },
      {
        header: "Design type",
        options: [
          "Students",
          "Programmers & coders",
          "Nerd",
          "Sales",
          "Motivational "
        ]
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
                      value={option}
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
