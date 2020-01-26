import React, { Component } from "react";

export class ProductView extends Component {
  render() {
    return (
      <div className="ms-product-view-wrapper">
        <button className="ms-product-view">
          Front <br /> Side
        </button>
        <button className="ms-product-view">
          Back <br /> Side
        </button>
        <button className="ms-product-view">
          Left <br /> Side
        </button>
        <button className="ms-product-view">
          Right <br /> Side
        </button>
        <button className="ms-product-view">
          Outside <br /> Label
        </button>
        <button className="ms-product-view">
          Inside <br /> Label
        </button>
        <button className="ms-product-view">
          Left <br /> Chest
        </button>
      </div>
    );
  }
}

export default ProductView;
