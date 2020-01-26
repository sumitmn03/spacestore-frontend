import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getEditableProducts } from "../../actions/products";

import { fabric } from "fabric";
import SelectEditingComponent from "./selectEditingComponents/SelectEditingComponent";
import {
  setImageSource,
  createBoundingBoxAndAddToCanvas,
  addNewTextbox,
  handleMOvementAndScaling,
  setHeightAndWidthAfterScaling,
  textAlignFunction,
  addImageToCanvas,
  resize_current_image
} from "../../myjs/myJs";
import MainProductEditorNav from "./productEditor/MainProductEditorNav";
import TextEditingComponent from "./textEditingComponents/TextEditingComponent";
import ProductView from "./productEditor/productView/ProductView";
import MainImageEditor from "./imageEditor/MainImageEditor";

// You may fail to save the image because it is sent by the backend and not directly from the frontend, if you want to see how to make it downloadable change the code in line 202 and 203

export class MainEditingComponent extends Component {
  static propTypes = {
    editable_products: PropTypes.array.isRequired
  };

  // keep default to be product
  // 1: product, 2: text, 3: logo, 4: design, 5: picture, 6: upload
  state = {
    what_to_edit: 1,
    text: "",
    fontFamily: "",
    fontSize: "",
    fill: "",
    fontWeight: "",
    fontStyle: "",
    count: 0
  };

  canvas = null;
  tshirtImage = null;
  boundingBox = null;

  images = require.context("../../pics/tshirts/", true);

  componentDidMount() {
    this.props.getEditableProducts();

    this.canvas = new fabric.Canvas("bounded");
    this.canvas.selection = false;
    this.tshirtImage = new fabric.Image("");
    this.canvas.add(this.tshirtImage);
    this.forceUpdate();

    let boundingBox = createBoundingBoxAndAddToCanvas(this.canvas);

    this.boundingBox = boundingBox;

    handleMOvementAndScaling(this.canvas, boundingBox);

    setHeightAndWidthAfterScaling(this.canvas);

    this.canvas.on("object:selected", () => {
      this.findWhatToEditOnFocus();
    });

    this.canvas.on("mouse:down", () => {
      this.findWhatToEditOnFocus();
    });

    this.canvas.on("text:changed", () => {
      this.setState({ text: this.canvas.getActiveObject().text });
    });
  }

  handle_image_resize = () => {
    resize_current_image(this.canvas, 250, 355);
  };

  handle_save = () => {
    let link = document.createElement("a");
    link.download = "filename.png";
    link.href = document.getElementById("bounded").toDataURL();
    link.click();

    this.boundingBox.set("opacity", 0);
    this.tshirtImage.set("opacity", 0);
    this.canvas.renderAll();
    link.href = document.getElementById("bounded").toDataURL();
    link.click();
    this.boundingBox.set("opacity", 110);
    this.tshirtImage.set("opacity", 10);
    this.canvas.renderAll();
    link.remove();
  };

  handle_adding_new_image_in_canvas = img_data => {
    addImageToCanvas(this.canvas, img_data);
  };

  handleTextAlign = where_to_align => {
    textAlignFunction(this.canvas, this.boundingBox, where_to_align);
  };

  removeActiveObject = () => {
    this.canvas.remove(this.canvas.getActiveObject());
  };

  // when user clicks on any button like product, text, upload etc.changeWhatToEdit... the right editing component (2nd component) changes according to what user selects
  changeWhatToEdit = what_to_edit => {
    this.setState({ what_to_edit });
  };

  // it adds a new textbox
  handleAddNewTextbox = () => {
    addNewTextbox(this.canvas);
    this.setState({ text: "Type here..." });
  };

  handleTextFeatureChange = new_data => {
    this.setState(new_data);

    let key = Object.keys(new_data)[0];
    let value = new_data[key];

    let active_object = this.canvas.getActiveObject();
    if (active_object) {
      active_object.set(key, value);
      active_object.setCoords();
      this.canvas.renderAll();
    }
  };

  findWhatToEditOnFocus = () => {
    let active_object = this.canvas.getActiveObject();
    if (active_object) {
      let active_object_type = active_object.get("type");
      if (active_object_type === "textbox") {
        this.changeWhatToEdit(2);
        this.setState({ text: active_object.text });
      } else if (active_object_type === "image") {
        this.changeWhatToEdit(3);
      }
    } else {
      this.changeWhatToEdit(1);
    }
  };

  // it displays the 2nd component based on what user has clicked on like product, text, upload, etc..... default is product
  findWhatToEdit = what_to_edit => {
    switch (what_to_edit) {
      case 1:
        return (
          <MainProductEditorNav
            setImageSource={setImageSource}
            canvas={this.canvas}
            tshirtImage={this.tshirtImage}
            editable_products={this.props.editable_products}
          />
        );

      case 2:
        return (
          <TextEditingComponent
            text={this.state.text}
            handleTextFeatureChange={this.handleTextFeatureChange}
            fontWeight={this.state.fontWeight}
            fontStyle={this.state.fontStyle}
            removeActiveObject={this.removeActiveObject}
            changeWhatToEdit={this.changeWhatToEdit}
            handleTextAlign={this.handleTextAlign}
          />
        );

      case 3:
        return (
          <MainImageEditor
            removeActiveObject={this.removeActiveObject}
            changeWhatToEdit={this.changeWhatToEdit}
            handle_image_resize={this.handle_image_resize}
          />
        );

      default:
        break;
    }
  };

  componentDidUpdate() {
    if (this.state.count === 0 && this.props.editable_products.length > 0) {
      let editable_product = this.props.editable_products.find(
        product => product.color === "darkgreen"
      );
      if (editable_product) {
        setImageSource(
          this.tshirtImage,
          // this.images("./darkgreentshirt.png"),
          editable_product.image,
          this.canvas
        );
      }

      this.setState({ count: 1 });
    }
  }

  render() {
    return (
      <div className="ms-design-page">
        <SelectEditingComponent
          addNewTextbox={this.handleAddNewTextbox}
          changeWhatToEdit={this.changeWhatToEdit}
          handle_adding_new_image_in_canvas={
            this.handle_adding_new_image_in_canvas
          }
          handle_save={this.handle_save}
        />
        {/* This is the main editing canvas */}
        <div className="ms-main-editing-component">
          <div className="ms-image-and-img-side-changing-button-wrapper">
            <canvas id="bounded" width="500" height="500" />
          </div>
        </div>
        {/* till here */}

        {/* different viewing angle button  */}

        <ProductView />

        {/* till here */}

        {this.findWhatToEdit(this.state.what_to_edit)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editable_products: state.products.editable_products
});

export default connect(mapStateToProps, { getEditableProducts })(
  MainEditingComponent
);
