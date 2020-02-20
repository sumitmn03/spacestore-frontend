import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MorePage extends Component {
  render() {
    let options = [
      { name: "Customer service", link: "help" },
      { name: "About", link: "about" },
      { name: "Business and investments", link: "" },
      { name: "Terms & conditions", link: "" }
    ];

    return (
      <div className="ms-more-page">
        <div className="ms-more-header">MORE</div>
        <div className="ms-more-body">
          {options.map((option, index) => (
            <Link key={index} to={`/${option.link}`} style={{ color: "white" }}>
              <div className="ms-more-body-option">{option.name}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default MorePage;
