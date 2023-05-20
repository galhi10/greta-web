import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { login } from "../../api/user";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import Card from "../../components/antd/card";
const DemoBox = (props) => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

import "./index.css";
import backgroundImage from "./MainPagePic.jpg";
import backgroundImage2 from "./logo.jpg";
import backgroundImage3 from "./watering.jpg";
import backgroundImage4 from "./greenLoan.jpg";
import backgroundImage5 from "./tree.jpg";

let currentHour = new Date().getTime();

function MainPage() {
  return (
    <>
      <div
        style={{
          height: "100%",
          backgroundImage: `url(${backgroundImage5})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "optimizeQuality",
          backfaceVisibility: "hidden",
        }}
      >
        <div class="banner">
          <div class="banner-content">
            <h1 class="banner-heading">Welcome to GRETA</h1>
            <p class="banner-description">
              Efficient Water Management for Healthy Plants
            </p>
          </div>
        </div>
        <div>
          <Row justify="start">
            <Col span={14}>
              <h1 className="main-heading"></h1>
            </Col>
          </Row>
          {/* <Col span={13} offset={10}>
            {/* <h1 className="About">
              Water is a precious resource that must be conserved. Greta
              Irrigation Solutions using a clever approach to watering, which
              allows us to save a great amount of water, and also makes sure you
              can give your plants the exact amount of water they need.
            </h1> */}
          {/* </Col> */}
        </div>
      </div>
    </>
  );
}

export default MainPage;
