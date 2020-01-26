import React, { Component } from "react";

export class MainUpload extends Component {
  readURL = input => {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.addEventListener("load", e => {
        this.props.handle_adding_new_image_in_canvas(e.target.result);
      });

      reader.readAsDataURL(input.files[0]);
    }
  };

  componentDidMount() {
    let readURL = this.readURL;

    document
      .getElementById("canvasImageUploader")
      .addEventListener("change", function() {
        readURL(this);
      });
  }

  render() {
    return (
      <div>
        <input
          style={{ display: "none" }}
          type="file"
          id="canvasImageUploader"
          ref={fileInput => (this.fileInput = fileInput)}
        />
        <span
          style={{ display: "block" }}
          onClick={() => this.fileInput.click()}
        >
          Upload
        </span>
      </div>
    );
  }
}

export default MainUpload;
