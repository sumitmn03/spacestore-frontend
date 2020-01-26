import React, { Component, Fragment } from "react";
import BoldAndItalic from "./boldAndItalic/BoldAndItalic";
import MainTextAlign from "./mainTextAlign/MainTextAlign";

import FontFamilyList from "./fontFamily/FontFamilyList";
import MainColorEditing from "./textColor/MainColorEditing";
import MainFontSize from "./textSize/MainFontSize";

export class TextEditingComponent extends Component {
  // 1: normal (maintext, fontfamily, textcolor, etc) 2:fontfamily
  state = {
    component_to_render: 1
  };

  changeComponentToBeRendered = component_to_render => {
    this.setState({ component_to_render });
  };

  findTheComponentToBeRendered = component_to_render => {
    let normal = (
      <div className="ms-text-editing-components-wrapper">
        {/* all these divs are the button in text editor sidebar  */}
        <div>
          <input
            type="text"
            name="text"
            className="ms-text-editing-component ms-text-editing-input"
            placeholder="Enter Your Text Here"
            value={this.props.text}
            onChange={e => {
              let key = "text";
              let value = e.target.value;
              this.props.handleTextFeatureChange({ [key]: value });
            }}
          />
        </div>
        {/* font family selecting button in text editing sidebar */}
        <button
          className="ms-text-editing-component"
          onClick={() => {
            this.changeComponentToBeRendered(2);
          }}
        >
          Font Family
        </button>
        <button
          className="ms-text-editing-component"
          onClick={() => {
            this.changeComponentToBeRendered(3);
          }}
        >
          Text Color
        </button>
        <button
          className="ms-text-editing-component"
          onClick={() => {
            this.changeComponentToBeRendered(4);
          }}
        >
          Text Size
        </button>
        <BoldAndItalic
          handleTextFeatureChange={this.props.handleTextFeatureChange}
          fontStyle={this.props.fontStyle}
          fontWeight={this.props.fontWeight}
        />
        <MainTextAlign
          handleTextFeatureChange={this.props.handleTextFeatureChange}
          handleTextAlign={this.props.handleTextAlign}
        />
        <button
          className="ms-text-editing-component ms-text-editing-component-remove"
          onClick={() => {
            this.props.removeActiveObject();
            this.props.changeWhatToEdit(1);
          }}
        >
          Remove
        </button>
      </div>
    );

    switch (component_to_render) {
      case 1:
        return normal;

      case 2:
        return (
          <FontFamilyList
            changeComponentToBeRendered={this.changeComponentToBeRendered}
            handleTextFeatureChange={this.props.handleTextFeatureChange}
          />
        );

      case 3:
        return (
          <MainColorEditing
            changeComponentToBeRendered={this.changeComponentToBeRendered}
            handleTextFeatureChange={this.props.handleTextFeatureChange}
          />
        );

      case 4:
        return (
          <MainFontSize
            changeComponentToBeRendered={this.changeComponentToBeRendered}
            handleTextFeatureChange={this.props.handleTextFeatureChange}
          />
        );

      default:
        break;
    }
  };

  render() {
    return (
      <Fragment>
        {this.findTheComponentToBeRendered(this.state.component_to_render)}
      </Fragment>
    );
  }
}

export default TextEditingComponent;
