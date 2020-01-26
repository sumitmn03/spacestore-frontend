import React, { Component } from "react";

export class MainCSolution extends Component {
  render() {
    return (
      <div className="ms-cs-main-solution">
        <div className="ms-cs-main-solution-answer">
          <div className="ms-cs-main-solution-answer-question">
            When will I receive my order ?
          </div>
          <p className="ms-cs-main-solution-answer-answer">
            On the rare occasion that your order is delayed, please check your
            email & messages for updates. A new delivery timeframe will be
            shared with you and you can also track its status by visiting My
            Orders. On the rare occasion that your order is delayed, please
            check your email & messages for updates. A new delivery timeframe
            will be shared with you and you can also track its status by
            visiting My Orders.
          </p>
        </div>
        <div className="ms-cs-main-solution-contact">
          <div className="ms-cs-main-solution-answer-question">
            Issue still not resolved ?
          </div>
          <div className="ms-cs-main-solution-contact-container">
            <div className="ms-cs-main-solution-call">Call me back</div>
            <div className="ms-cs-main-solution-email">Email us</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainCSolution;
