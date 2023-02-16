import React, { Component } from "react";
import Container from "./Container";
import Button from "./Button";
import Text from "./Text";
import "../css/Message.css";

export default class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container className="Message-container">
        <div className="post message">
          <div className="username-date-container">
            <div className="green-box">
              <div className="username-text">{this.props.arr[0].username}</div>
            </div>
          </div>
          {this.props.arr.map((item, i) => (
            <div key={i} className="content-container">
              <div className="content-field messages message-1">
                {item.text}
                <div className="date-container message-date-1">
                  {item.date_and_time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }
}
