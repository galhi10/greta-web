import React, { Component } from "react";
import "../css/LoginPage.css";
import Login from "./Login";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="LoginPage">
        <header className="LoginPage-header">
          <Login loggedIn={this.props.loggedIn} />
        </header>
      </div>
    );
  }
}
