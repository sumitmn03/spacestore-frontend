import React, { Component } from "react";
import SingleFontFamily from "./SingleFontFamily";

export class FontFamilyList extends Component {
  render() {
    const { changeComponentToBeRendered } = this.props;

    let font_families = ["Inconsolata", "Pacifico", "Quicksand", "VT323"];

    return (
      <div
        className="ms-font-family-components-page"
        onClick={e =>
          e.target ===
          document.getElementsByClassName("ms-font-family-components-page")[0]
            ? changeComponentToBeRendered(1)
            : ""
        }
      >
        <div className="ms-font-family-components-wrapper">
          <div
            className="ms-font-family-component close"
            onClick={() => {
              this.props.changeComponentToBeRendered(1);
            }}
          >
            Close
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
      </div>
    );
  }
}

export default FontFamilyList;
