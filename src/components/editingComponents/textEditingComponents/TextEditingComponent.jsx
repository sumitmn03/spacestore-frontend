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
    switch (component_to_render) {
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

      case 5:
        return (
          <MainTextAlign
            handleTextFeatureChange={this.props.handleTextFeatureChange}
            handleTextAlign={this.props.handleTextAlign}
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

        <div className="ms-text-editing-components-wrapper">
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
          <button
            className="ms-text-editing-component"
            onClick={() => this.changeComponentToBeRendered(2)}
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
            onClick={() => this.changeComponentToBeRendered(4)}
          >
            Text Size
          </button>
          <BoldAndItalic
            changeComponentToBeRendered={this.changeComponentToBeRendered}
            handleTextFeatureChange={this.props.handleTextFeatureChange}
            fontStyle={this.props.fontStyle}
            fontWeight={this.props.fontWeight}
          />
          <button
            className="ms-text-editing-component"
            onClick={() => this.changeComponentToBeRendered(5)}
          >
            Align
          </button>
          {/* <MainTextAlign
            handleTextFeatureChange={this.props.handleTextFeatureChange}
            handleTextAlign={this.props.handleTextAlign}
          /> */}
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
      </Fragment>
    );
  }
}

export default TextEditingComponent;
