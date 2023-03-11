import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../css/NavBar.css";
import { Cookie } from "../cookie";
import { Token } from "../token";
import config from "../config";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    const payload = Token.decode(Cookie.getToken());
    this.state = {
      user_id: payload.user_id,
    };
  }

  render() {
    return (
      <header className="header">
        <h1 className="headline">
          <Link to="/Posts/1">GSN</Link>
        </h1>
        <ul className="main-nav">
          {this.state.user_id == config.admin_id ? (
            <li>
              <Link to="/Admin">Manage Users</Link>
            </li>
          ) : undefined}
          <li>
            <Link to="/Posts/1">Posts</Link>
          </li>
          <li>
            <Link to="/Messages/1">Messages</Link>
          </li>
          <li>
            <li></li>
            <Link to="/GenerateSchedule">Irrigation Schedule</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/SystemConfig">SystemConfig</Link>
          </li>
          <li>
            <Link
              onClick={() => {
                Cookie.deleteToken();
              }}
              to="/"
            >
              Logout
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}
