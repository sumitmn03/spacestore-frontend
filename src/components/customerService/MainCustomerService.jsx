import React, { Component } from "react";
import MainCQuery from "./queries/MainCQuery";
import MainSolution from "./solutions/MainCSolution";

export class MainCustomerService extends Component {
  render() {
    return (
      <div className="ms-main-cs">
        <MainCQuery />
        <MainSolution />
      </div>
    );
  }
}

export default MainCustomerService;
