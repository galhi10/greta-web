import React, { Component } from "react";
import "../css/Select.css";
import { Cookie } from "../cookie";
import { Token } from "../token";

export default class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
    };

    if (!Cookie.isTokenValid()) {
      window.location.href = "/";
      return;
    }
  }

  componentDidMount() {
    this.setState({ isAdmin: Token.isAdmin() });
  }

  render() {
    return (
      <div className="box">
        <select id="select-friend">
          {this.state.isAdmin ? <option value={0}> All </option> : undefined}
          {this.props.users.map((item, i) => (
            <option value={item.user_id} key={i}>
              {item.full_name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
