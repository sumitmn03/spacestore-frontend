import React, { Component } from "react";

export class MainQna extends Component {
  render() {
    const { q_n_as } = this.props.product;

    return (
      <div className="ms-qna-main">
        <div className="ms-qna-main-header">QUESTIONS & ANSWERS</div>
        <div className="ms-qna-main-body">
          {q_n_as.map(qna => (
            <div key={qna.id} className="ms-qna-main-qna-container">
              <div>
                <span className="ms-qna-page-qna-q-f"> Question: </span>
                <span className="ms-qna-page-qna-q-s"> {qna.question} </span>
              </div>
              <div className="ms-qna-page-qna-a">
                <span className="ms-qna-page-qna-a-f">Answer: </span>
                <span className="ms-qna-page-qna-a-s"> {qna.answer} </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MainQna;
