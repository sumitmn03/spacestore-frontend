import React, { Component, Fragment } from "react";
import ProductTypes from "./productComponents/ProductTypes";
import MainProductColor from "./productColors/MainProductColor";

export class MainProductEditorNav extends Component {
  // 1: normal (maintext, fontfamily, textcolor, etc) 2:fontfamily
  state = {
    component_to_render: 1
  };

  changeComponentToBeRendered = component_to_render => {
    this.setState({ component_to_render });
  };

  findTheComponentToBeRendered = () => {
    let { setImageSource, canvas, tshirtImage, editable_products } = this.props;

    let normal = (
      <div className="ms-product-editing-components-wrapper">
        {/* all these divs are the button in text editor sidebar  */}
        <div
          className="ms-product-editing-component"
          onClick={() => {
            this.changeComponentToBeRendered(2);
          }}
        >
          Type
        </div>
        <div
          className="ms-product-editing-component"
          onClick={() => {
            this.changeComponentToBeRendered(3);
          }}
        >
          Color
        </div>
      </div>
    );

    switch (this.state.component_to_render) {
      case 1:
        return normal;

      case 2:
        return (
          <ProductTypes
            changeComponentToBeRendered={this.changeComponentToBeRendered}
          />
        );
      case 3:
        return (
          <MainProductColor
            changeComponentToBeRendered={this.changeComponentToBeRendered}
            setImageSource={setImageSource}
            canvas={canvas}
            tshirtImage={tshirtImage}
            editable_products={editable_products}
          />
        );

      default:
        console.log(
          "something is wrong with findTheComponentToBeRendered() function in MainProductEditorNav"
        );
        break;
    }
  };

  render() {
    return <Fragment>{this.findTheComponentToBeRendered()}</Fragment>;
  }
}

export default MainProductEditorNav;
