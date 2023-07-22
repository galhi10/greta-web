import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../../api/user";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import Card from "../../components/antd/card";
import { getUser, updateUser } from "../../api/user";
import "./index.css";
import { useEffect } from "react";
import backgroundImage5 from "./tree.jpg";
import { GetTemperature, getWeatherAlert } from "../../api/weather";
import useToken from "../../hooks/useToken";
import { GetConfig } from "../../api/configuration";

// to complete
function MainPage() {
  const [temperature, setTemperature] = useState(undefined);
  const [user, setUser] = useState({});
  const [config, setConfig] = useState({});
  const [extremeWeather, setExtremeWeather] = useState("");
  const { token } = useToken();

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser(token);
      if (user.ok) {
        setUser(user.data);
      }
    }

    fetchUser();
  }, []);

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
    async function getExtremeWeatherAlert() {
      if (config.city && config.country) {
        const result = await getWeatherAlert(config.city, config.country);
        if (result.extreme) {
          setExtremeWeather(result.msg);
        }
      }
    }
    fetchTemp();
    getExtremeWeatherAlert();
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
        <Row>
          <Col style={{ paddingLeft: "30px" }}>
            <h1 class="banner-heading">
              Welcome to GRETA {user?.first_name} {user?.last_name}
            </h1>
            <p class="banner-description">
              Efficient Water Management for Healthy Plants
            </p>
          </Col>
        </Row>
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
        </div>
        <div>
          {temperature && (
            <Row>
              <Col
                style={{ paddingLeft: "30px", width: "50px", maxWidth: "20px" }}
              >
                <h1 className="extreme">{extremeWeather}</h1>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </>
  );
}

export default MainPage;
