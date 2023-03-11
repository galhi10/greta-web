import React, { Component } from "react";
// import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Post from "./Post";
import Text from "./Text";
import "../css/PostPage.css";
import Button from "./Button";
import Container from "./Container";
import { APIcall } from "../APIcalls";
import { Cookie } from "../cookie";
import "../css/pagination.css";
export default class GretaMainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postsArr: [],
      N_posts: [],
      N: 5,
      numPages: 1,
    };

    if (!Cookie.isTokenValid()) {
      window.location.href = "/";
      return;
    }
    this.updatePostsList = this.updatePostsList.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    fetch(APIcall.getPosts, {
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
        // this.setState({ postsArr: responseJson.data });
        // const url = window.location.href.split("/");
        // this.setState({
        //   N_posts: this.state.postsArr.slice(
        //     (url[url.length - 1] - 1) * this.state.N,
        //     this.state.N * url[url.length - 1]
        //   ),
        // });
        // this.setState({
        //   numPages: Math.ceil(this.state.postsArr.length / this.state.N),
        // });
      })
      .catch((err) => {
        this.setState({ msg: err.toString() });
      });
  };

  updatePostsList = () => {
    this.fetchPosts();
  };

  createPost = (value) => {
    const request = JSON.stringify({
      text: value,
    });

    fetch(APIcall.post, {
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
        console.log("Post created!");
        this.fetchPosts();
      })
      .catch((err) => {
        this.setState({ msg: err.toString() });
      });
  };

  render() {
    const submit_post_btn = {
      type: "Post",
      className: "button signup",
      clicked: () => {
        const post_input =
          document.getElementsByClassName("post-input")[0].value;
        this.createPost(post_input);
      },
    };
    return (
      <div className="page-container">
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          <Typography variant="h1" gutterBottom>
            h1. Heading
          </Typography>
        </Box>
        <div className="textarea-container"></div>
        <div className="posts-container"></div>
      </div>
    );
  }
}
