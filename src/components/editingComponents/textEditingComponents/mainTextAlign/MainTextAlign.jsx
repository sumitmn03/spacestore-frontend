import React, { Component } from "react";

export class MainTextAlign extends Component {
  render() {
    return (
      <div className="ms-font-align-btn-wrapper">
        <button
          className="ms-font-align-btn"
          onClick={() => {
            this.props.handleTextAlign("left");
          }}
        >
          Left
        </button>
        <button
          className="ms-font-align-btn center"
          onClick={() => {
            this.props.handleTextAlign("center");
          }}
        >
          Center
        </button>
        <button
          className="ms-font-align-btn"
          onClick={() => {
            this.props.handleTextAlign("right");
          }}
        >
          Right
        </button>
      </div>
    );
  }
}

export default MainTextAlign;
