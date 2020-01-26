import React, { Component } from "react";

export class SingleProductType extends Component {
  render() {
    return (
      <div
        className="ms-product-editing-component"
        onClick={() => {
          console.log(this.props.product_type + " clicked");
          this.props.changeComponentToBeRendered(1);
        }}
      >
        {this.props.product_type}
      </div>
    );
  }
}

export default SingleProductType;
