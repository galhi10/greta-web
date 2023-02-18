import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import Headline from "./Headline";
import Container from "./Container";
import { APIcall } from "../APIcalls";
import { Cookie } from "../cookie";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { msg: "" };
  }

  loginBtnClicked = () => {
    const username = document.getElementById("username_input").value;
    const password = document.getElementById("password_input").value;

    const request = JSON.stringify({
      email: username,
      password: password,
    });

    // Default options are marked with *
    fetch(APIcall.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: request,
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 200) return responseJson;
        else throw Error(responseJson.error_msg);
      })
      .then((responseJson) => {
        document.cookie =
          "token=Bearer " + responseJson.data.token + ";path=/posts";
        this.props.loggedIn();
        window.location.href = "/posts/1";
      })
      .catch((err) => {
        this.setState({ msg: err.toString() });
      });
  };

  render() {
    const login_btn = {
      type: "Login",
      className: "button login",
      clicked: this.loginBtnClicked,
    };
    const signUp_btn = {
      type: "Signup",
      className: "button signup",
    };

    const username_input = {
      id: "username_input",
      type: "text",
      placeholder: "Username",
      className: "info-input",
    };
    const password_input = {
      id: "password_input",
      type: "password",
      placeholder: "Password",
      className: "info-input",
    };

    return (
      <div className="container">
        <Headline data="Gal's Sociallll Network" />
        <Container className="container-box">
          <div className="credentials">
            <Input data={username_input} />
            <Input data={password_input} />
          </div>
          <div className="btn-box">
            <Button data={login_btn} />
            <Link to="/Signup">
              <Button data={signUp_btn} />
            </Link>
          </div>
        </Container>
        <div className="error-msg">{this.state.msg}</div>
      </div>
    );
  }
}
