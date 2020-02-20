import React, { Component } from "react";
import SingleFontColor from "./SingleFontColor";

export class MainColorEditing extends Component {
  componentDidMount() {
    document.addEventListener("click", e => console.log(e.target));
  }

  render() {
    let font_colors = ["black", "red", "green", "blue", "yellow"];

    return (
      <div className="ms-text-editing-components-wrapper">
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
    );
  }
}

export default MainColorEditing;
