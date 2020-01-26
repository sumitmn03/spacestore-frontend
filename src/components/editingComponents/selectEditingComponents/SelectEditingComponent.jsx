import React, { Component } from "react";

import MainUpload from "../uploadingComponents/MainUpload";

export class SelectEditingComponent extends Component {
  render() {
    const { changeWhatToEdit, addNewTextbox } = this.props;

    return (
      <div className="ms-select-editing-component-wrapper">
        <button
          className="ms-select-editing-component"
          onClick={() => {
            changeWhatToEdit(1);
          }}
        >
          Product
        </button>
        <button
          className="ms-select-editing-component"
          onClick={() => {
            addNewTextbox();
            changeWhatToEdit(2);
          }}
        >
          Text
        </button>
        {/* <button
          className="ms-select-editing-component"
          onClick={() => {
            changeWhatToEdit(3);
          }}
        >
          Logo
        </button> */}
        {/* <button
          className="ms-select-editing-component"
          onClick={() => {
            changeWhatToEdit(4);
          }}
        >
          Design
        </button> */}
        {/* <button
          className="ms-select-editing-component"
          onClick={() => {
            changeWhatToEdit(5);
          }}
        >
          Picture
        </button> */}
        <button
          className="ms-select-editing-component"
          onClick={() => {
            changeWhatToEdit(6);
          }}
        >
          <MainUpload
            handle_adding_new_image_in_canvas={
              this.props.handle_adding_new_image_in_canvas
            }
          />
        </button>
        <button
          className="ms-select-editing-component ms-select-editing-component-save"
          onClick={() => {
            this.props.handle_save();
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

export default SelectEditingComponent;
