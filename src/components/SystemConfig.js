import React, { Component } from "react";
import "../css/Styles.css";
import Container from "./Container";

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
    return (
      <Container>
        <div className="header-box">
          <div className="checkboxes">
            <h2>Checkboxes</h2>
            <div className="checkbox-row">
              <span>Checkbox 1:</span>
              <input
                name="checkbox1"
                type="checkbox"
                checked={this.state.checkbox1}
                onChange={this.handleCheckboxChange}
              />
            </div>
            <div className="checkbox-row">
              <span>Checkbox 2:</span>
              <input
                name="checkbox2"
                type="checkbox"
                checked={this.state.checkbox2}
                onChange={this.handleCheckboxChange}
              />
            </div>
            <div className="checkbox-row">
              <span>Checkbox 3:</span>
              <input
                name="checkbox3"
                type="checkbox"
                checked={this.state.checkbox3}
                onChange={this.handleCheckboxChange}
              />
            </div>
          </div>
          <div className="select-boxes">
            <h2>Select Boxes</h2>
            <div className="select-row">
              <span>Select 1:</span>
              <select
                name="select1"
                value={this.state.select1}
                onChange={this.handleSelectChange}
              >
                <option value="">--Select--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="select-row">
              <span>Select 2:</span>
              <select
                name="select2"
                value={this.state.select2}
                onChange={this.handleSelectChange}
              >
                <option value="">--Select--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="select-row">
              <span>Select 3:</span>
              <select
                name="select3"
                value={this.state.select3}
                onChange={this.handleSelectChange}
              >
                <option value="">--Select--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
