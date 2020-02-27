import React, { Component } from "react";

export class SingleTextColor extends Component {
  render() {
    let { handleTextFeatureChange, font_color } = this.props;

    return (
      <div
        className="ms-font-color-component"
        onClick={() => {
          let key = "fill";
          let value = font_color;
          handleTextFeatureChange({ [key]: value });
        }}
      >
        {font_color}
      </div>
    );
  }
}

export default SingleTextColor;
