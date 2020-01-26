// NOT USING THIS COMPONENT ANYMORE AS THE WHOLE CODE IS IN THE MainEditingComponent

import React, { Component, Fragment } from "react";
import { fabric } from "fabric";
import {
  setImageSource,
  createBoundingBoxAndAddToCanvas
} from "../../../myjs/myJs";
import MainEditingComponent from "../MainEditingComponent";

export class EditingCanvas extends Component {
  state = {};

  canvas = null;

  images = require.context("../../../pics/tshirts/", true);

  componentDidMount() {
    this.canvas = new fabric.Canvas("bounded");
    this.canvas.selection = false;
    let tshirtImage = new fabric.Image("");
    this.canvas.add(tshirtImage);

    setImageSource(
      tshirtImage,
      this.images(`./darkgreentshirt.png`),
      this.canvas
    );

    createBoundingBoxAndAddToCanvas(this.canvas);
  }
  render() {
    return (
      <Fragment>
        <div id="ms-main-editing-component">
          <div id="ms-image-and-img-side-changing-button-wrapper">
            <canvas id="bounded" width="500" height="500" />
            <button className="ms-img-side-changing-btn">Front</button>
            <button className="ms-img-side-changing-btn">Back</button>
            <button className="ms-img-side-changing-btn">LHS</button>
            <button className="ms-img-side-changing-btn">RHS</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditingCanvas;
