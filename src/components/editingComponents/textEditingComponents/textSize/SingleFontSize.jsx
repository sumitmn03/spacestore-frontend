import React, { Component } from "react";

export class SingleFontSize extends Component {
  render() {
    let { handleTextFeatureChange, font_size } = this.props;

    return (
      <div
        className="ms-font-size-component"
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
