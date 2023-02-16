import React, { Component } from "react";
import "../css/Text.css";

export default class Headline extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="container">
        <div className="header-box">
          <h1 className="headline">{data}</h1>
        </div>
      </div>
    );
  }
}
