import React, { Component } from "react";
import SingleFontColor from "./SingleFontColor";

export class MainColorEditing extends Component {
  // componentDidMount() {
  //   document.addEventListener("click", e => console.log(e.target));
  // }

  render() {
    const { changeComponentToBeRendered } = this.props;

    let font_colors = ["black", "red", "green", "blue", "yellow"];

    return (
      <div
        className="ms-font-color-components-page"
        onClick={e =>
          e.target ===
          document.getElementsByClassName("ms-font-color-components-page")[0]
            ? changeComponentToBeRendered(1)
            : ""
        }
      >
        <div className="ms-font-color-components-wrapper">
          <div
            className="ms-font-color-component close"
            onClick={() => {
              this.props.changeComponentToBeRendered(1);
            }}
          >
            Close
          </div>
          {/* <button
          className="ms-text-editing-component"
          style={{ color: "#047feb" }}
          onClick={() => {
            this.props.changeComponentToBeRendered(1);
          }}
        > */}
          {/* <button
            onClick={() => {
              this.props.changeComponentToBeRendered(1);
            }}
          >
            {"<"}
          </button>{" "}
          <b>Text Colors</b> */}
          {/* Close
        </button> */}
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
      </div>
    );
  }
}

export default MainColorEditing;
