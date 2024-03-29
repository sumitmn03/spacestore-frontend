import React, { Component } from "react";
import SingleProductType from "./SingleProductType";

export class ProductTypes extends Component {
  render() {
    let product_types = ["T-Shirt", "SweatShirt", "Hoodie"];

    return (
      <div className="ms-product-editing-components-wrapper">
        <button
          className="ms-product-editing-component"
          onClick={() => {
            this.props.changeComponentToBeRendered(1);
          }}
          style={{ color: "#047feb", position: "sticky" }}
        >
          {/* <button
            onClick={() => {
              this.props.changeComponentToBeRendered(1);
            }}
          >
            {"<"}
          </button>{" "} */}
          {/* <b>Type</b> */}
          Back
        </button>
        {product_types.map((product_type, index) => {
          return (
            <SingleProductType
              key={index}
              product_type={product_type}
              changeComponentToBeRendered={
                this.props.changeComponentToBeRendered
              }
            />
          );
        })}
      </div>
    );
  }
}

export default ProductTypes;
