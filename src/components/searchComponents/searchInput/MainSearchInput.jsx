import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

export class MainInput extends Component {
  state = {
    search: ""
  };

  temp = 0;

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  handleOnChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.queries !== this.props.queries && this.state.search === "")
      this.setState({ search: this.props.queries.search_query });
  }

  render() {
    const { search } = this.state;
    const { queries, order_by, history } = this.props;

    return (
      <div className="search-container">
        <form
          onSubmit={e => {
            e.preventDefault();
            history.push(
              `/search/ ${order_by.trim()}/ ${search.trim()}/ ${
                queries.type_query ? queries.type_query : ""
              }/ ${queries.color_query ? queries.color_query : ""}/ ${
                queries.design_type_query ? queries.design_type_query : ""
              }/ ${queries.size_query ? queries.size_query : ""}`
            );
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            name="search"
            value={search}
            onChange={this.handleOnChange}
            className="ms-mainsearch-search-input"
          />
          <button type="submit" className="ms-not-small">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(MainInput);
