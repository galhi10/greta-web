import React, { Component } from "react";
import Container from "./Container";
import { Cookie } from "../cookie";
import "../css/Post.css";
import { Token } from "../token";
import Button from "./Button";
import { APIcall } from "../APIcalls";

export default class Post extends Component {
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

  deletePost = () => {
    const request = JSON.stringify({
      post_id: this.props.postData.id,
    });

    fetch(APIcall.deletePost, {
      method: "DELETE",
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
        this.props.reload();
      })
      .catch((err) => {
        this.setState({ msg: err.toString() });
      });
  };

  render() {
    const signUp_btn = {
      type: "Delete",
      className: "button signup",
      clicked: this.deletePost,
    };

    return (
      <Container>
        <div className="post">
          <div className="username-date-container">
            <div className="green-box">
              <div className="username-text">
                {this.props.postData.username}
              </div>
              <div className="date-text">
                {this.props.postData.creation_date}
              </div>
            </div>
          </div>
          <div className="content-container">
            <div className="content-field">{this.props.postData.text}</div>
          </div>
        </div>
        {this.state.isAdmin ? <Button data={signUp_btn} /> : undefined}
      </Container>
    );
  }
}

// Post:
// - date
// - username
// - content
