import React, { Component } from "react";

export class SingleFontSize extends Component {
  render() {
    let { handleTextFeatureChange, font_size } = this.props;

    return (
      <div
        className="ms-text-editing-component"
        onClick={() => {
          let key = "fontSize";
          let value = font_size;
          handleTextFeatureChange({ [key]: value });
        }}
      >
        {font_size}
      </div>
    );
  }
}

export default SingleFontSize;
