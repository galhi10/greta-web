import React, { Component } from "react";

export default class Text extends Component {
  render() {
    const data = {
      placeholder: "What's on your mind? :)",
      type: "text",
      className: "post-input",
    };
    return (
      <div className="post-container">
        <textarea
          className={data.className}
          placeholder={data.placeholder}
          type={data.type}
        ></textarea>
      </div>
    );
  }
}
