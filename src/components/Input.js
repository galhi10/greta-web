import React, { Component } from "react";
import "../css/Input.css";

export default class Input extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <input
          id={data.id}
          className={data.className}
          placeholder={data.placeholder}
          type={data.type}
        ></input>
      </div>
    );
  }
}
