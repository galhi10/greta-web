import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../../api/user";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import Card from "../../components/antd/card";
const CITY = "Haifa";
import "./index.css";
import { useEffect } from "react";
import backgroundImage5 from "./tree.jpg";
import { GetTemperature } from "../../api/weather";
import useToken from "../../hooks/useToken";
import { GetConfig } from "../../api/configuration";

// to complete
function MainPage() {
  const [temperature, setTemperature] = useState(undefined);
  const [config, setConfig] = useState({});
  const { token } = useToken();

  useEffect(() => {
    // make it as default values, so we'll be able to change only one field to submit
    async function fetchData() {
      const response = await GetConfig(token);
      setConfig({ ...response });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTemp() {
      const temp = await GetTemperature(config.city);
      setTemperature(temp);
    }
    fetchTemp();
  }, [config]);

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
          {temperature && (
            <Row>
              <Col style={{ paddingLeft: "80px" }} span={2}>
                <h1 className="temp" style={{}}>
                  Temperature: {temperature?.toFixed(1)}
                  <span>{"\u00b0C"}</span>
                </h1>
              </Col>
            </Row>
          )}
          {/* 
          <Col span={13} offset={10}>
            <h1 className="About">
              Water is a precious resource that must be conserved. Greta
              Irrigation Solutions using a clever approach to watering, which
              allows us to save a great amount of water, and also makes sure you
              can give your plants the exact amount of water they need.
            </h1>
          </Col> */}
        </div>
      </div>
    </>
  );
}

export default MainPage;
