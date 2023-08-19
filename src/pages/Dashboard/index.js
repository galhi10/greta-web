import React, { useState } from "react";
import { TiWeatherSunny, TiWeatherPartlySunny } from "react-icons/ti";
import { RiPlantLine } from "react-icons/ri";

import { Button, Col, Row, Typography, Divider, Table } from "antd";
import Card from "../../components/antd/card";
import { BiChip } from "react-icons/bi";
import { MdOutlineNotListedLocation } from "react-icons/md";
import "./index.css";
import { useEffect } from "react";
import useToken from "../../hooks/useToken";
import { getDevices, setDevice } from "../../api/devices";
import { GetConfig } from "../../api/configuration";
import { GetTemperature, getHumidity } from "../../api/weather";
import { getSchedule, runAlgo } from "../../api/irrigation";
import { BsDropletFill, BsDropletHalf, BsDroplet } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";

const { Title } = Typography;

const DashboardPage = () => {
  const [temperature, setTemperature] = useState(undefined);
  const [humidity, setHumidity] = useState(undefined);
  const [devices, setDevices] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [config, setConfig] = useState({});
  const [irrigation, setIrrigation] = useState(false);
  const { token } = useToken();

  useEffect(() => {
    // make it as default values, so we'll be able to change only one field to submit
    async function fetchConfig() {
      const response = await GetConfig(token);
      setConfig({ ...response });
    }
    async function fetchSchedule() {
      const schedule = await getSchedule(token);

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

      for (const row of data) {
        if (row.status === "Active") {
          setIrrigation(true);
        }
        row.start_humidity += "%";
        row.end_humidity += "%";
        row.irrigation_time += " seconds";
        row.irrigation_volume += " liter";
      }

      setTableColumns(columns);
      setTableData(data);
    }
    fetchConfig();
    fetchSchedule();
  }, []);

  useEffect(() => {
    async function fetchTemp() {
      const temp = await GetTemperature(config.city, config.country);
      setTemperature(temp);
    }
    async function fetchHumidity() {
      const humidity = await getHumidity(config.city, config.country);

      setHumidity(humidity);
    }
    if (config.city && config.country) {
      fetchTemp();
      fetchHumidity();
    }
  }, [config]);

  const getDevicesData = async () => {
    const devices = await getDevices(token);
    console.log("🚀 ~ file: index.js:95 ~ getDevicesData ~ devices:", devices);
    if (devices.length) {
      setDevices(devices);
    } else {
      setDevices([]);
    }
  };

  useEffect(() => {
    getDevicesData();
  }, []);

  const onUpdateMode = async (deviceId, mode) => {
    const response = await setDevice(token, {
      _id: deviceId,
      config: {
        mode,
      },
    });
    await getDevicesData();
    console.log(
      "🚀 ~ file: index.js:67 ~ onNewSensorFinish ~ response:",
      response
    );
  };

  return (
    <Row>
      <Col span={24}>
        <Card title={<Title level={2}>Dashboard</Title>} bordered={false}>
          <Row>
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
              {temperature && (
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
              {humidity && <Col>Air humidity: {humidity}%</Col>}
            </Col>
            <Col style={{ paddingTop: "36px" }} span={4}>
              <Col>
                <MdOutlineNotListedLocation size={"2.5em"} />
              </Col>
              {config?.city && config?.country && (
                <Col>
                  Location: {config.country}, {config.city}
                </Col>
              )}
            </Col>
            <Divider />
          </Row>

          <Row>
            <Col span={8}>
              <Title>Devices: </Title>
            </Col>
          </Row>

          {devices.map((device, idx) => (
            <Row>
              <Col span={8}>
                <Title
                  style={{ paddingTop: "45px", paddingLeft: "25px" }}
                  level={4}
                >
                  Device {idx + 1}: {device?.config?.name}{" "}
                </Title>
              </Col>
              <Col style={{ paddingTop: "36px" }} span={4}>
                <Col>
                  <BiChip size={"2.5em"} />
                </Col>
                Identifier: {device?.config?.id}
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
                {<Col>Ground humidity: {device.humidity}%</Col>}
              </Col>
              <Col style={{ paddingTop: "36px" }} span={4}>
                <Col>
                  <TiLightbulb size={"2.5em"} />
                </Col>
                Mode: {device?.config?.mode}
                <Col>
                  <Button
                    type="primary"
                    onClick={async () => {
                      await onUpdateMode(
                        device?._id,
                        device?.config?.mode === "Automatic"
                          ? "Manual"
                          : "Automatic"
                      );
                    }}
                  >
                    Change mode to{" "}
                    {device?.config?.mode === "Automatic"
                      ? "Manual"
                      : "Automatic"}
                  </Button>
                </Col>
              </Col>

              <Divider />
            </Row>
          ))}

          {irrigation && (
            <Row>
              <Col
                span={2}
                style={{
                  height: "min-content",
                  paddingTop: "27px",
                }}
              >
                <RiPlantLine className="plantIcon" color="green" size={"4em"} />
              </Col>

              <Col span={8}>
                <Title> Irrigation has started! </Title>
              </Col>
            </Row>
          )}

          <Row>
            <Col span={24}>
              <Table dataSource={tableData} columns={tableColumns} />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={async () => {
                  await runAlgo(token);
                }}
              >
                Run algorithm
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardPage;
