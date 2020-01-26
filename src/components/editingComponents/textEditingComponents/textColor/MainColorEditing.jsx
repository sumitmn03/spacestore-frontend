import React, { Component } from "react";
import SingleFontColor from "./SingleFontColor";

export class MainColorEditing extends Component {
  render() {
    let font_colors = ["black", "red", "green", "blue", "yellow"];

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
          <b>Text Colors</b>
        </div>
        {font_colors.map((font_color, index) => {
          return (
            <SingleFontColor
              key={index}
              font_color={font_color}
              handleTextFeatureChange={this.props.handleTextFeatureChange}
            />
          );
        })}
      </div>
    );
  }
}

export default MainColorEditing;
