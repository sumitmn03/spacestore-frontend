import React, { Component } from "react";
import SingleFontFamily from "./SingleFontFamily";

export class FontFamilyList extends Component {
  state = {};

  render() {
    let font_families = ["Inconsolata", "Pacifico", "Quicksand", "VT323"];

    return (
      <div className="ms-text-editing-components-wrapper">
        {/* // <div id="ms-fontfamily-list"> */}
        <div className="ms-text-editing-component">
          <button
            onClick={() => {
              this.props.changeComponentToBeRendered(1);
            }}
          >
            {"<"}
          </button>{" "}
          <b>Font Family List</b>
        </div>
        {font_families.map((font_family, index) => {
          return (
            <SingleFontFamily
              key={index}
              font_family={font_family}
              handleTextFeatureChange={this.props.handleTextFeatureChange}
            />
          );
        })}
      </div>
    );
  }
}

export default FontFamilyList;
