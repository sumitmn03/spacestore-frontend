import React, { Component, Fragment } from "react";

export class MainImageEditor extends Component {
  state = {
    component_to_render: 1
  };

  changeComponentToBeRendered = component_to_render => {
    this.setState({ component_to_render });
  };

  findTheComponentToBeRendered = component_to_render => {
    let {
      removeActiveObject,
      changeWhatToEdit,
      handle_image_resize
    } = this.props;

    let normal_view = (
      <div className="ms-image-editing-components-wrapper">
        <div
          className="ms-image-editing-component"
          onClick={() => {
            handle_image_resize();
          }}
        >
          Resize
        </div>
        <div
          className="ms-image-editing-component ms-image-editing-component-remove"
          onClick={() => {
            removeActiveObject();
            changeWhatToEdit(1);
          }}
        >
          Remove
        </div>
      </div>
    );

    switch (component_to_render) {
      case 1:
        return normal_view;

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

export default MainImageEditor;
