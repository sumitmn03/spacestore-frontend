import React, { Component } from "react";
import SingleFontSize from "./SingleFontSize";

export class MainTextSize extends Component {
  render() {
    const { changeComponentToBeRendered } = this.props;
    let font_sizes = [
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      32,
      34,
      36,
      38,
      40,
      50,
      60
    ];

    return (
      <div
        className="ms-font-size-components-page"
        onClick={e =>
          e.target ===
          document.getElementsByClassName("ms-font-size-components-page")[0]
            ? changeComponentToBeRendered(0)
            : ""
        }
      >
        <div className="ms-font-size-components-wrapper">
          <div
            className="ms-font-size-component ms-not-small"
            style={{ color: "#047feb" }}
            onClick={() => {
              this.props.changeComponentToBeRendered(1);
            }}
          >
            Close
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
      </div>
    );
  }
}

export default MainTextSize;
