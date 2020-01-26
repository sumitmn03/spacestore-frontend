import React, { Component } from "react";
import SingleFontSize from "./SingleFontSize";

export class MainTextSize extends Component {
  render() {
    let font_sizes = [30, 32, 34, 36, 38, 40, 50, 60];
    return (
      <div className="ms-text-editing-components-wrapper">
        <div className="ms-text-editing-component">
          <button
            onClick={() => {
              this.props.changeComponentToBeRendered(1);
            }}
          >
            {"<"}
          </button>{" "}
          <b>Text Sizes</b>
        </div>
        {font_sizes.map((font_size, index) => {
          return (
            <SingleFontSize
              key={index}
              font_size={font_size}
              handleTextFeatureChange={this.props.handleTextFeatureChange}
            />
          );
        })}
      </div>
    );
  }
}

export default MainTextSize;
