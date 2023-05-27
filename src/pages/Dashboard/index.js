import React, { useCallback, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { TiWeatherSunny, TiWeatherPartlySunny } from "react-icons/ti";

import { getUser, updateUser } from "../../api/user";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Modal,
  Divider,
  message,
  Table,
} from "antd";
import Card from "../../components/antd/card";
import { BiChip, BiRename } from "react-icons/bi";
import { MdOutlineNotListedLocation } from "react-icons/md";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useToken from "../../hooks/useToken";
import { deleteDevice, getDevices, setDevice } from "../../api/devices";
import { GetConfig } from "../../api/configuration";
import { GetTemperature, getHumidity } from "../../api/weather";
import { getSchedule } from "../../api/irrigation";
import { BsDropletFill, BsDropletHalf, BsDroplet } from "react-icons/bs";

const { Title, Text } = Typography;

const DashboardPage = () => {
  const [temperature, setTemperature] = useState(undefined);
  const [humidity, setHumidity] = useState(undefined);
  const [devices, setDevices] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [config, setConfig] = useState({});
  const { token } = useToken();

  useEffect(() => {
    // make it as default values, so we'll be able to change only one field to submit
    async function fetchConfig() {
      const response = await GetConfig(token);
      setConfig({ ...response });
    }
    async function fetchSchedule() {
      const schedule = await getSchedule(token);
      console.log(
        "🚀 ~ file: index.js:48 ~ fetchSchedule ~ response:",
        schedule
      );

      const columns = [];

      for (const key of Object.keys(schedule[0])) {
        if (key === "_id") {
          continue;
        }
        columns.push({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key: key,
        });
      }

      const data = [];

      for (const index of schedule.keys()) {
        data.push({
          key: index,
          ...schedule[index],
        });
      }
      console.log("🚀 ~ file: index.js:67 ~ fetchSchedule ~ data:", data);

      setTableColumns(columns);
      setTableData(data);
    }
    fetchConfig();
    fetchSchedule();
  }, []);

  useEffect(() => {
    async function fetchTemp() {
      const temp = await GetTemperature(config.city);
      setTemperature(temp);
    }
    async function fetchHumidity() {
      const humidity = await getHumidity(config.city);
      console.log(
        "🚀 ~ file: index.js:91 ~ fetchHumidity ~ humidity:",
        humidity
      );
      setHumidity(humidity);
    }
    fetchTemp();
    fetchHumidity();
  }, [config]);

  const getDevicesData = async () => {
    const devices = await getDevices(token);
    console.log("🚀 ~ file: index.js:39 ~ getDevicesData ~ devices:", devices);
    if (devices.length) {
      setDevices(devices);
    } else {
      setDevices([]);
    }
  };

  useEffect(() => {
    getDevicesData();
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Card title={<Title level={2}>Dashboard</Title>} bordered={false}>
          <Row style={{ paddingBottom: "20px" }}>
            <Col span={8}>
              <Title>Location stats: </Title>
            </Col>
            <Col style={{ paddingTop: "36px" }} span={4}>
              <Col>
                {temperature >= 30 ? (
                  <TiWeatherSunny size={"2.5em"} />
                ) : (
                  <TiWeatherPartlySunny size={"2.5em"} />
                )}
              </Col>
              {humidity && (
                <Col>
                  Temperature: {temperature?.toFixed(1)}{" "}
                  <span>{"\u00b0C"}</span>
                </Col>
              )}
            </Col>
            <Col style={{ paddingTop: "36px" }} span={4}>
              <Col>
                {humidity <= 30 ? (
                  <BsDroplet size={"2.5em"} />
                ) : humidity <= 70 ? (
                  <BsDropletHalf size={"2.5em"} />
                ) : (
                  <BsDropletFill size={"2.5em"} />
                )}
              </Col>
              {humidity && <Col>Humidity: {humidity}%</Col>}
            </Col>
          </Row>

          <Row style={{ paddingBottom: "50px" }}>
            <Col span={8}>
              <Title>Devices: </Title>
            </Col>
            {devices.map((device) => (
              <>
                <Col style={{ paddingTop: "36px" }} span={4}>
                  <Col>
                    <BiChip size={"2.5em"} />
                  </Col>
                  Identifier: {device.sensor.id}
                </Col>
                <Col style={{ paddingTop: "36px" }} span={4}>
                  <Col>
                    {device.humidity <= 30 ? (
                      <BsDroplet size={"2.5em"} />
                    ) : device.humidity <= 70 ? (
                      <BsDropletHalf size={"2.5em"} />
                    ) : (
                      <BsDropletFill size={"2.5em"} />
                    )}
                  </Col>
                  {<Col>Humidity: {device.humidity}%</Col>}
                </Col>
                <Col style={{ paddingTop: "36px" }} span={4}>
                  <Col>
                    <BiChip size={"2.5em"} />
                  </Col>
                  Location: {device.sensor.location}
                </Col>

                <Col style={{ paddingTop: "36px" }} span={4}>
                  <Col>
                    <MdOutlineNotListedLocation size={"2.5em"} />
                  </Col>
                  Name: {device.sensor.model}
                </Col>
              </>
            ))}
          </Row>

          <Row>
            <Col span={24}>
              <Table dataSource={tableData} columns={tableColumns} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardPage;
