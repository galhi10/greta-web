import React, { Component } from "react";
import Message from "./Message";
import Container from "./Container";
import Text from "./Text";
import Button from "./Button";
import "../css/MessagesPage.css";
import Select from "./Select";
import { Cookie } from "../cookie";
import { APIcall } from "../APIcalls";

export default class MessagesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesArr: [],
      sendersArr: [],
      usersArr: [],
      N_senders: [],
      N: 1,
      numPages: 1,
    };

    if (!Cookie.isTokenValid()) {
      window.location.href = "/";
      return;
    }
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    this.fetchMessages();
    this.fetchUsers();
  }

  fetchMessages = () => {
    fetch(APIcall.getMessages, {
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
        this.setState({ messagesArr: responseJson.data });
        const arr = responseJson.data.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (data) => data.sender_user_id === value.sender_user_id
            )
        );

        this.setState({ sendersArr: arr });

        const url = window.location.href.split("/");

        this.setState({
          N_senders: arr.slice(
            (url[url.length - 1] - 1) * this.state.N,
            this.state.N * url[url.length - 1]
          ),
        });

        this.setState({
          numPages: Math.ceil(arr.length / this.state.N),
        });
      })
      .catch((err) => {
        this.setState({ msg: err.toString() });
      });
  };

  fetchUsers = () => {
    fetch(APIcall.getUsers, {
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

  sendMessage = () => {
    const user = document.getElementById("select-friend").value;
    const message = document.getElementsByClassName("post-input")[0].value;

    if (user === "0") {
      let request = JSON.stringify({
        text: message,
      });
      fetch(APIcall.sendMessageToAllUsers, {
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
          console.log("Message Sent!");
          this.fetchAll();
        })
        .catch((err) => {
          this.setState({ msg: err.toString() });
        });
    } else {
      let request = JSON.stringify({
        user_id: user,
        text: message,
      });

      fetch(APIcall.sendMessage, {
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
          console.log("Message Sent!");
          this.fetchAll();
        })
        .catch((err) => {
          this.setState({ msg: err.toString() });
        });
    }
  };

  render() {
    const submit_post_btn = {
      type: "Send",
      className: "button login send-msg-btn",
      clicked: this.sendMessage,
    };
    return (
      <div className="page-container messages-container">
        <div className="textarea-container">
          <Container>
            <div className="new-message">
              <Select users={this.state.usersArr} />
              <Text />
              <Button data={submit_post_btn} />
            </div>
          </Container>
        </div>
        <div className="posts-container">
          {this.state.N_senders.map((item, i) => (
            <Message
              key={i}
              arr={this.state.messagesArr.filter(
                (item) =>
                  this.state.N_senders[i].sender_user_id === item.sender_user_id
              )}
            />
          ))}
        </div>
        <div className="pagination">
          {[...new Array(this.state.numPages)].map((item, i) => (
            <a key={i + 1} className="page-number" href={i + 1}>
              {i + 1}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
