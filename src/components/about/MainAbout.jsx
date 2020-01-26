import React, { Component } from "react";

export class MainAbout extends Component {
  render() {
    return (
      <div className="ms-about-page">
        <h1 className="ms-about-page-header">About Us</h1>
        <div className="ms-about-page-content">
          {" "}
          Our aim is to make it possible for everyone to design and customized
          products for themselves as per what he/she is exactly looking for. We
          believe in a decentralized market where everyone can buy thing of
          their choice rather than buying what is available in the market. We
          value the feedback given by the users whether it is a negative or a
          positive one.
        </div>
      </div>
    );
  }
}

export default MainAbout;
