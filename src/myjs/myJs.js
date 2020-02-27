import { fabric } from "fabric";

let myFirstIndex = 0,
  mySecondIndex = 0;

export const run_carousel = (
  carousel_no,
  carousel_products,
  images,
  main_images,
  main_images_class
) => {
  if (carousel_products.length > 0 && images[0] && main_images[0]) {
    let index = myFirstIndex;
    if (carousel_no === "second") index = mySecondIndex;

    if (images[index]) images[index].style.display = "block";

    setTimeout(() => {
      if (main_images[index])
        main_images[index].classList = `${main_images_class} close`;

      setTimeout(() => {
        if (images[index]) images[index].style.display = "none";
        if (main_images[index])
          main_images[index].classList = `${main_images_class} open`;

        index++;
        if (index >= carousel_products.length - 1) index = 0;

        if (carousel_no === "second") {
          mySecondIndex = index;
        } else {
          myFirstIndex = index;
        }

        run_carousel(
          carousel_no,
          carousel_products,
          images,
          main_images,
          main_images_class
        );
      }, 500);
    }, 5000);
  } else if (carousel_products.length === 0) {
    setTimeout(() => {
      run_carousel(
        carousel_no,
        carousel_products,
        images,
        main_images,
        main_images_class
      );
    }, 1000);
  } else {
    setTimeout(() => {
      run_carousel(
        carousel_no,
        carousel_products,
        images,
        main_images,
        main_images_class
      );
    }, 5000);
  }
};

export const resize_current_image = (canvas, width, height) => {
  let active_object = canvas.getActiveObject();
  if (active_object) {
    if (active_object.get("type") === "image") {
      active_object.set("scaleX", width / active_object.width);
      active_object.set("scaleY", height / active_object.height);
      active_object.setCoords();
      canvas.renderAll();
    }
  }
};

export const addImageToCanvas = (canvas, img_data) => {
  let new_img = new Image();

  new_img.onload = img => {
    let x_ratio = 250 / img.target.width,
      y_ratio = 355 / img.target.height;

    let final_ratio = 1;

    if (img.target.width > 250 || img.target.height > 355) {
      let smaller_ratio = x_ratio < y_ratio ? x_ratio : y_ratio;
      final_ratio = smaller_ratio;
    }

    let new_fab_img = new fabric.Image(new_img, {
      left: (500 - 250) / 2,
      top: 110,
      scaleX: final_ratio,
      scaleY: final_ratio
    });
    canvas.add(new_fab_img).setActiveObject(new_fab_img);
    new_fab_img.setCoords();
    canvas.renderAll();
  };
  new_img.src = img_data;
};

export const textAlignFunction = (canvas, boundingBox, where_to_align) => {
  let movingBox = canvas.getActiveObject();
  if (movingBox) {
    switch (where_to_align) {
      case "left":
        movingBox.set("left", boundingBox.left);
        break;

      case "center":
        movingBox.set(
          "left",
          boundingBox.left + (boundingBox.width - movingBox.width) / 2
        );
        break;

      case "right":
        movingBox.set(
          "left",
          boundingBox.left + boundingBox.width - movingBox.width
        );
        break;

      default:
        console.log("something is wrong in the textAlignFunction in myJs.js");
        break;
    }

    movingBox.setCoords();
    canvas.renderAll();
  }
};

// creatig a moving box
export const addNewTextbox = canvas => {
  let movingBox;
  if (window.innerWidth < 992) {
    movingBox = new fabric.Textbox("Type Here...", {
      // left: (500 - 250) / 2,
      // top: 110,
      width: 100,
      left: (260 - 100) / 2,
      top: 120,
      fontSize: 19,
      textAlign: "center",
      hasRotatingPoint: false,
      lockScalingY: true,
      _controlsVisibility: { ml: true, mr: true }
    });
  } else {
    movingBox = new fabric.Textbox("Type Here...", {
      // left: (500 - 250) / 2,
      // top: 110,
      width: 100,
      left: (350 - 100) / 2,
      top: 190,
      fontSize: 19,
      textAlign: "center",
      hasRotatingPoint: false,
      lockScalingY: true,
      _controlsVisibility: { ml: true, mr: true }
    });
  }

  canvas.add(movingBox).setActiveObject(movingBox);
};

// Creating a bounding box
export const createBoundingBoxAndAddToCanvas = canvas => {
  let boundingBox;
  if (window.innerWidth < 992) {
    boundingBox = new fabric.Rect({
      fill: "rgba(0,0,0,0)",
      width: 120,
      height: 170,
      textAlign: "end",
      left: (260 - 120) / 2,
      top: 115,
      stroke: "black",
      evented: false,
      selectable: false
    });
  } else {
    boundingBox = new fabric.Rect({
      fill: "rgba(0,0,0,0)",
      width: 160,
      height: 230,
      textAlign: "end",
      left: (350 - 160) / 2,
      top: 180,
      stroke: "black",
      evented: false,
      selectable: false
    });
  }

  canvas.add(boundingBox);
  return boundingBox;
};

export const setImageSource = (image, img_scr, canvas) => {
  if (window.innerWidth < 992) {
    image.setSrc(img_scr, img => {
      img.set({
        evented: false,
        selectable: false,
        top: 55,
        scaleX: 260 / img.width,
        scaleY: 260 / img.height
      });
      img.setCoords();
      canvas.renderAll();
    });
  } else {
    image.setSrc(img_scr, img => {
      img.set({
        evented: false,
        selectable: false,
        top: 100,
        // top: 35,
        // top: 35,
        // scaleX: 260 / img.width,
        // scaleY: 300 / img.height
        scaleX: 350 / img.width,
        scaleY: 350 / img.height
      });
      img.setCoords();
      canvas.renderAll();
    });
  }
};

export const setHeightAndWidthAfterScaling = canvas => {
  canvas.on("object:scaled", () => {
    let active_object = canvas.getActiveObject();
    if (active_object.type === "textbox") {
      active_object.set("width", active_object.width * active_object.scaleX);
    }
  });
};

export const handleMOvementAndScaling = (canvas, boundingBox) => {
  // On moving of bounding box
  canvas.on("object:moving", () => {
    let activeObject = canvas.getActiveObject();
    if (activeObject.type === "textbox") {
      let top = activeObject.top;
      // let bottom = top + activeObject.height;
      let left = activeObject.left;
      // let right = left + activeObject.width;

      let topBound = boundingBox.top;
      let bottomBound = topBound + boundingBox.height;
      let leftBound = boundingBox.left;
      let rightBound = leftBound + boundingBox.width;

      activeObject.set(
        "left",
        Math.min(Math.max(left, leftBound), rightBound - activeObject.width)
      );
      activeObject.set(
        "top",
        Math.min(Math.max(top, topBound), bottomBound - activeObject.height)
      );
      activeObject.setCoords();
      // console.log(activeObject);
    }
  });

  // On scaling of bounding box
  canvas.on("object:scaling", () => {
    let activeObject = canvas.getActiveObject();
    if (activeObject.type === "textbox") {
      let top = activeObject.top;
      let bottom = top + activeObject.height;
      let left = activeObject.left;
      let right = left + activeObject.width;

      let topBound = boundingBox.top;
      // let bottomBound = topBound + boundingBox.height;
      let leftBound = boundingBox.left;
      let rightBound = leftBound + boundingBox.width;

      let leftMovingBoxOldWidth = right - leftBound;
      let reftMovingBoxOldWidth = rightBound - left;
      let topMovingBoxOldHeight = bottom - topBound;

      if (left < leftBound) {
        activeObject.set("width", leftMovingBoxOldWidth);
        activeObject.set("left", leftBound);
      }

      if (right > rightBound) {
        activeObject.set("width", reftMovingBoxOldWidth);
        activeObject.set("left", rightBound - reftMovingBoxOldWidth);
      }

      if (top < topBound) {
        activeObject.set("height", topMovingBoxOldHeight);
        activeObject.set("top", topBound);
      }
      activeObject.setCoords();
    }
  });
};
