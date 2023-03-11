import React, { Component } from "react";
import "../css/Styles.css";
import Container from "./Container";
import Button from "./Button";

export default class SystemConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      select1: "",
      select2: "",
      select3: "",
    };
  }

  handleCheckboxChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSelectChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const data = {
      placeholder: "",
      type: "text",
      className: "post-config_input",
    };
    const update_btn = {
      type: "Update Config",
      className: "button config",
      clicked: () => {
        this.SignUp();
      },
    };
    return (
      <Container>
        <span className="config-page">
          <div className="config-page">
            <div className="checkboxes">
              <h2>Configuration Page</h2>
              <div className="checkbox-row">
                <span>Auto Mode:</span>
                <input
                  name="checkbox1"
                  type="checkbox"
                  checked={this.state.checkbox1}
                  onChange={this.handleCheckboxChange}
                />
              </div>
              <div className="checkbox-row">
                <span>Email Notification:</span>
                <input
                  name="checkbox2"
                  type="checkbox"
                  checked={this.state.checkbox2}
                  onChange={this.handleCheckboxChange}
                />
              </div>
            </div>
            <div className="select-boxes">
              <div className="select-row">
                <span>Region:</span>
                <select
                  name="select1"
                  value={this.state.select1}
                  onChange={this.handleSelectChange}
                >
                  <option value="option1">Coastal Plain</option>
                  <option value="option2">Mountain Area</option>
                  <option value="option3">Negav and the Vallies</option>
                  <option value="option3">Eilat and the Arava</option>
                </select>
              </div>
              <div className="select-row">
                <span>Light Condition:</span>
                <select
                  name="select2"
                  value={this.state.select2}
                  onChange={this.handleSelectChange}
                >
                  <option value="option1">Partial shade</option>
                  <option value="option2">Direct sun</option>
                </select>
              </div>
            </div>
            <div className="post-config">
              <span>Grass size (SQM):</span>
              <textarea
                className={data.className}
                placeholder={data.placeholder}
                type={data.type}
              ></textarea>
            </div>
            <div className="btn-box">
              <Button data={update_btn} />
            </div>
          </div>
        </span>
      </Container>
    );
  }
}
