import React, { Component } from "react";
import "../css/Button.css";

export default class Button extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
      this.props.data.clicked();
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <button onClick={this.handleClick} className={data.className}>{data.type} </button>
      </div>
    );
  }
}
