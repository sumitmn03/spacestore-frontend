import React, { Component } from "react";

export class SingleTextColor extends Component {
  render() {
    let { handleTextFeatureChange, font_color } = this.props;

    return (
      <button
        className="ms-text-editing-component"
        onClick={() => {
          let key = "fill";
          let value = font_color;
          handleTextFeatureChange({ [key]: value });
        }}
      >
        {font_color}
      </button>
    );
  }
}

export default SingleTextColor;
