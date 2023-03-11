import "./App.css";
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import PostsPage from "./components/PostPage";
import MessagesPage from "./components/MessagesPage";
import NavBar from "./components/NavBar";
import { Cookie } from "./cookie";
import About from "./components/About";
import ManageUsers from "./components/ManageUsers";
import { GenerateSchedule } from "./components/GenerateSchedule";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    this.doesTokenExists();
  }

  doesTokenExists = () => {
    if (!Cookie.getToken()) this.setState({ isLoggedIn: false });
    else this.setState({ isLoggedIn: true });
  };

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? <NavBar /> : undefined}
        <header className="App-header">
          <Routes>
            <Route
              path=""
              element={<LoginPage loggedIn={this.doesTokenExists} />}
            />
            <Route path="signup" element={<Signup />} />
            <Route path="posts/:page" element={<PostsPage />} />
            <Route path="messages/:page" element={<MessagesPage />} />
            <Route path="GenerateSchedule" element={<GenerateSchedule />} />
            <Route path="about" element={<About />} />
            <Route path="admin" element={<ManageUsers />} />
          </Routes>
        </header>
      </div>
    );
  }
}
