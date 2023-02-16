import React, { Component } from "react";
import Input from "./Input";
import Button from "./Button";
import Headline from "./Headline";
import Container from "./Container";
import { APIcall } from "../APIcalls";
import "../css/Container.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = { msg: "" };
  }

  SignUp = () => {
    const full_name = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const request = JSON.stringify({
      full_name: full_name,
      email: email,
      password: password,
    });

    fetch(APIcall.createUser, {
      method: "PUT",
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
        this.setState({ msg: "User created!" });
      })
      .catch((err) => {
        this.setState({ msg: err.toString() });
      });
  };

  render() {
    const signup_btn = {
      type: "Signup",
      className: "button signup",
      clicked: () => {
        this.SignUp();
      },
    };
    const fullName_input = {
      type: "text",
      placeholder: "Full Name",
      className: "info-input",
      id: "full_name",
    };
    const username_input = {
      type: "text",
      placeholder: "Email",
      className: "info-input",
      id: "email",
    };
    const password_input = {
      type: "password",
      placeholder: "Password",
      className: "info-input",
      id: "password",
    };
    return (
      <div className="container">
        <Headline data={"Welcome"} />
        <Container className="container-box">
          <div className="credentials">
            <Input data={fullName_input} />
            <Input data={username_input} />
            <Input data={password_input} />
          </div>
          <div className="btn-box">
            <Button data={signup_btn} />
          </div>
        </Container>
        <div className="error-msg">{this.state.msg}</div>
      </div>
    );
  }
}
