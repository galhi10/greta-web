import React, { Component } from "react";
import { APIcall } from "../APIcalls";
import config from "../config";
import { Cookie } from "../cookie";
import "../css/ManageUsers.css";

export default class ManageUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersArr: [],
    };

    if (!Cookie.isTokenValid()) {
      window.location.href = "/";
      return;
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  changeUserStatus = (user_id, event) => {

    const request = JSON.stringify({
      user_id: user_id,
      status: event.target.value,
    });

    fetch(APIcall.changeUserStatus, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookie.getToken(),
      },
      body: request,
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 200) return responseJson;
        else {
          // Cookie.deleteToken();
          // window.location.href = "/";
          throw Error(responseJson.error_msg);
        }
      })
      .then((responseJson) => {
        console.log("user status has changed!");
        this.fetchUsers();
      })
      .catch((err) => {
        this.setState({ msg: err.toString() });
      });
  };

  fetchUsers = () => {
    fetch(APIcall.adminGetUsers, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookie.getToken(),
      },
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 200) return responseJson;
        else {
          // Cookie.deleteToken();
          // window.location.href = "/";
          throw Error(responseJson.error_msg);
        }
      })
      .then((responseJson) => {
        this.setState({ usersArr: responseJson.data });
      })
      .catch((err) => {
        this.setState({ msg: err.toString() });
      });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="table">
            <div className="row header">
              <div className="cell">User ID</div>
              <div className="cell">Full Name</div>
              <div className="cell">Email</div>
              <div className="cell">Creation Date</div>
              <div className="cell">Status</div>
            </div>
            {this.state.usersArr.map((item, i) => (
              <div key={i} className="row">
                <div className="cell" data-title="User ID">
                  {item.user_id}
                </div>
                <div className="cell" data-title="Full Name">
                  {item.full_name}
                </div>
                <div className="cell" data-title="Email">
                  {item.email}
                </div>
                <div className="cell" data-title="Creation Date">
                  {item.creation_date}
                </div>
                {item.user_id !== config.admin_id ? (
                  <select
                    className="cell"
                    data-title="Status"
                    value={item.status}
                    id={item.user_id}
                    onChange={this.changeUserStatus.bind(this, item.user_id)}
                    key={i}
                  >
                    <option type="active">active</option>
                    <option type="suspended">suspended</option>
                    <option type="created">created</option>
                    <option type="deleted">deleted</option>
                  </select>
                ) : (
                  <div className="cell" data-title="Creation Date">
                    Admin
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
