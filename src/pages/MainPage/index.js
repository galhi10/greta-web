import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { login } from "../../api/user";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import Card from "../../components/antd/card";
const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;

import "./index.css";

function MainPage() {
  return (
    <>
      <Row justify="start">
        <Col span={6} offset = {2}>
          <h1 className="main-heading">Greta</h1>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <h1 className="Sustainable">Sustainable Irrigation System</h1>
        </Col>
      </Row>
      <Row><h1></h1> </Row>
      <Row><h1></h1></Row>
      <Row><h1></h1></Row>
      <Row><h1></h1></Row>
      <Row><h1></h1></Row>
      <Row><h1></h1></Row>
      <Row><h1></h1></Row>
      <Col span={13} offset={10}>
      <h1 className="About">Water is a precious resource that must be conserved.
       Greta Irrigation Solutions using a clever approach to watering, which allows us to save a great amount
       of water, and also makes sure you can give your
       plants the exact amount of water they need.</h1>
      </Col>
    </>
  );
}

export default MainPage;
