import React, { Component } from "react";
import StoreSingleProduct from "./StoreSingleProduct";

export class StoreHomePage extends Component {
  render() {
    let products = [
      {
        image: "./darkgreentshirt.png",
        name: "plain green tshirt",
        original_price: 200,
        current_price: 200,
        rating: 5,
        sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        category: "Programmer"
      },
      {
        image: "./yellow.jpg",
        name: "plain yellow tshirt",
        original_price: 200,
        current_price: 200,
        rating: 4.5,
        sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        category: "Hacker"
      },
      {
        image: "./bluetshirt.png",
        name: "all colors and all size plain yellow tshirt by cheran ",
        original_price: 200,
        current_price: 200,
        rating: 5,
        sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        category: "Party"
      },
      {
        image: "./whitetshirt.png",
        name: "plain white tshirt",
        original_price: 200,
        current_price: 200,
        rating: 5,
        sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        category: "Motivational"
      }
    ];

    return (
      <div className="ms-store-wrapper">
        <div className="ms-store-category-container">
          <h1 className="ms-store-header">Hoodies For All Occasions</h1>
          {products.map((product, index) => (
            <StoreSingleProduct key={index} product={product} />
          ))}
        </div>
        <div className="ms-store-category-container">
          <h1 style={{ color: "rgb(76, 148, 76)" }} className="ms-store-header">
            Cool T-Shirts
          </h1>
          {products.map((product, index) => (
            <StoreSingleProduct key={index} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default StoreHomePage;
