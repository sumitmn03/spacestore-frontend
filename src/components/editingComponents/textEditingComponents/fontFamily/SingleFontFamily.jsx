import React, { Component } from "react";

export class SingleFontFamily extends Component {
  render() {
    let { handleTextFeatureChange, font_family } = this.props;

    return (
      <div
        className="ms-font-family-component"
        onClick={() => {
          let key = "fontFamily";
          let value = font_family;
          handleTextFeatureChange({ [key]: value });
        }}
      >
        {font_family}
      </div>
    );
  }
}

export default SingleFontFamily;
