import React, { Component } from "react";
import "../css/Container.css";

export default class Container extends Component {
  render() {
    return <div className="container-box">{this.props.children}</div>;
  }
}
