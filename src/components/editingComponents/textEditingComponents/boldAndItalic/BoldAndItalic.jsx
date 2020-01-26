import React, { Component, Fragment } from "react";

export class BoldAndItalic extends Component {
  render() {
    const { handleTextFeatureChange, fontWeight, fontStyle } = this.props;

    return (
      <Fragment>
        <div className="ms-font-weightnstyle-btn-wrapper">
          <button
            className="ms-font-weightnstyle-btn ms-font-bold-btn"
            onClick={() => {
              let key = "fontWeight";
              let value = fontWeight === "bold" ? "normal" : "bold";
              handleTextFeatureChange({ [key]: value });
            }}
          >
            <b>Bold</b>
          </button>{" "}
          <button
            className="ms-font-weightnstyle-btn"
            onClick={() => {
              let key = "fontStyle";
              let value = fontStyle === "italic" ? "normal" : "italic";
              handleTextFeatureChange({ [key]: value });
            }}
          >
            <i>Italic</i>
          </button>{" "}
        </div>
      </Fragment>
    );
  }
}

export default BoldAndItalic;
