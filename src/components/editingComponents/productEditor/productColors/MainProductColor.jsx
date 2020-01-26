import React, { Component } from "react";
import SingleProductColor from "./SingleProductColor";

export class MainProductColor extends Component {
  render() {
    let { setImageSource, canvas, tshirtImage, editable_products } = this.props;

    let product_colors = ["darkgreen", "blue", "white"];

    return (
      <div className="ms-product-editing-components-wrapper">
        <div className="ms-product-editing-component">
          <button
            onClick={() => {
              this.props.changeComponentToBeRendered(1);
            }}
          >
            {"<"}
          </button>{" "}
          <b>Colors</b>
        </div>
        {product_colors.map((product_color, index) => {
          return (
            <SingleProductColor
              key={index}
              product_color={product_color}
              setImageSource={setImageSource}
              canvas={canvas}
              tshirtImage={tshirtImage}
              editable_products={editable_products}
            />
          );
        })}
      </div>
    );
  }
}

export default MainProductColor;
