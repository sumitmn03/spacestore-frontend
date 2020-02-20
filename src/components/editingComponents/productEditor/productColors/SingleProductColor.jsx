import React, { Component } from "react";

export class SingleProductColor extends Component {
  // images = require.context("../../../../pics/tshirts/", true);

  render() {
    let {
      setImageSource,
      canvas,
      tshirtImage,
      product_color,
      editable_products
    } = this.props;

    return (
      <button
        className="ms-product-editing-component"
        onClick={() => {
          let editable_product = editable_products.find(
            product => product.color === product_color
          );

          if (editable_product) {
            setImageSource(tshirtImage, editable_product.image, canvas);
          }
        }}
      >
        {product_color}
      </button>
    );
  }
}

export default SingleProductColor;
