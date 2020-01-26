import React, { Component } from "react";
import MainFilter from "./filter/MainFilter";
import MainMarketPlaceBody from "./marketPlaceBody/MainMarketPlaceBody";

export class MainMarketPlace extends Component {
  render() {
    return (
      <div className="ms-main-marketplace">
        <MainFilter />
        <MainMarketPlaceBody />
      </div>
    );
  }
}

export default MainMarketPlace;
