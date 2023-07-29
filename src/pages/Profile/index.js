import React, { useCallback, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

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
  InputNumber,
  Select,
  Radio,
  Space,
} from "antd";
import Card from "../../components/antd/card";

import "./index.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useToken from "../../hooks/useToken";
import {
  createDevice,
  deleteDevice,
  getDevices,
  setDevice,
} from "../../api/devices";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [devices, setDevices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProfileModalOpen, setIsProfileModelOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModelOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [deviceMessage, setDeviceMessage] = useState("");
  const [mode, setMode] = useState(undefined);
  const [selectedDeviceId, setSelectedDeviceId] = useState(undefined);

  const removeDeviceMessage = (id) => {
    messageApi.open({
      type: "success",
      content: `Device ${id} removed successfully`,
    });
  };

  const { token } = useToken();

  const getUserData = async () => {
    const user = await getUser(token);
    if (user.ok) {
      setUser(user.data);
    } else {
      setUser(undefined);
    }
  };

  const getDevicesData = async () => {
    const devices = await getDevices(token);
    console.log("🚀 ~ file: index.js:39 ~ getDevicesData ~ devices:", devices);
    if (devices.length) {
      setDevices(devices);
    } else {
      setDevices([]);
    }
  };

  const removeDevice = async (id) => {
    console.log("🚀 ~ file: index.js:57 ~ removeDevice ~ id:", id);
    await deleteDevice(token, id);
    removeDeviceMessage(id);
    await getDevicesData();
  };

  useEffect(() => {
    getUserData();
    getDevicesData();
  }, []);

  const showProfileModal = () => {
    setIsProfileModelOpen(true);
  };

  const showDeviceModal = () => {
    setIsDeviceModelOpen(true);
  };

  const handleProfileCancel = () => {
    setIsProfileModelOpen(false);
  };

  const handleDeviceCancel = () => {
    setIsDeviceModelOpen(false);
  };

  const onProfileFinish = useCallback(async (values) => {
    await updateUser(values, token);
    getUserData();

    setIsProfileModelOpen(false);
  }, []);

  const onUpdateSensorFinish = async (values) => {
    const response = await setDevice(token, {
      _id: selectedDeviceId,
      config: {
        id: values.deviceId,
        mode: values.Mode,
        name: values.deviceName,
        grass: values.GrassType,
        size: values.LoanSize,
        ground: values.SoilType,
        liters_per_minute: values.TubeCapacity,
        light: values.LightCondition,
      },
    });
    console.log(
      "🚀 ~ file: index.js:67 ~ onNewSensorFinish ~ response:",
      response
    );
    if (response.ok) {
      setDeviceMessage(`Device ${selectedDeviceId} updated successfully!`);
    } else {
      setDeviceMessage("Update was not successful. Please try again");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return user ? (
    <Row>
      {contextHolder}
      <Col span={24}>
        <Card title={<Title level={2}>Profile</Title>} bordered={false}>
          <Row style={{ paddingTop: "10px" }}>
            <Col span={2}>Email: </Col>
            <Col span={4}>
              <Input disabled defaultValue={user.email} />
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col span={2}>First name: </Col>
            <Col span={4}>
              <Input disabled defaultValue={user.first_name} />
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col span={2}>Last name: </Col>
            <Col span={4}>
              <Input disabled defaultValue={user.last_name} />
            </Col>
          </Row>

          <Row style={{ paddingTop: "20px" }}>
            <Col>
              <Button type="primary" onClick={showProfileModal}>
                Update your profile
              </Button>
              <Modal
                title="Update your profile:"
                open={isProfileModalOpen}
                // onOk={onProfileFinish}
                onCancel={handleProfileCancel}
                okButtonProps={{
                  form: "updateForm",
                  key: "submit",
                  htmlType: "submit",
                }}
              >
                <Row style={{ paddingBottom: "10px" }}>
                  <Col>
                    <Typography>
                      Note: You can update one values or more...
                    </Typography>
                  </Col>
                </Row>

                <Form
                  name="update user"
                  id="updateForm"
                  initialValues={{ remember: true }}
                  onFinish={onProfileFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item name="email">
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      defaultValue={user.email}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item name="password">
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item name="first_name">
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="First name"
                    />
                  </Form.Item>

                  <Form.Item name="last_name">
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Last name"
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card title={<Title level={2}>Devices</Title>} bordered={false}>
          <Row
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Col>
              <Modal
                open={isDeviceModalOpen}
                // onOk={onDeviceFinish}
                onCancel={handleDeviceCancel}
                footer={null}
                width={"600px"}
              >
                <Form
                  name="validate_other"
                  // {...formItemLayout}
                  onFinish={onUpdateSensorFinish}
                >
                  <h1 className="main-heading">
                    Update sensor {selectedDeviceId}
                  </h1>
                  <Row style={{ paddingBottom: "10px" }}>
                    <Col>
                      <Typography>
                        Note: You can update one values or more...
                      </Typography>
                    </Col>
                  </Row>
                  <Form.Item name="deviceId" label={"Device ID"}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <InputNumber
                        style={{
                          width: "300px",
                        }}
                        min={0}
                      />
                    </div>
                  </Form.Item>

                  <Form.Item name="deviceName" label="Device name">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <Input
                        style={{
                          width: "300px",
                        }}
                        min={0}
                      />
                    </div>
                  </Form.Item>

                  <Form.Item name="LightCondition" label="Light Condition">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <Select style={{ width: "300px" }}>
                        <option value="Direct sun">Direct sun</option>
                        <option value="Partial shade">Partial shade</option>
                      </Select>
                    </div>
                  </Form.Item>

                  <Form.Item name="GrassType" label="Grass Type">
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <Select style={{ width: "300px" }}>
                        <option value="Ryegrass">Ryegrass</option>
                        <option value="Floratam">Floratam</option>
                        <option value="Fine Fescue">Fine Fescue</option>
                        <option value="Bluegrass">Bluegrass</option>
                        <option value="Bentgrass">Bentgrass</option>
                      </Select>
                    </div>
                  </Form.Item>

                  <Form.Item name="SoilType" label="Soil Type">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <Select style={{ width: "300px" }}>
                        <option value="Hard">Hard</option>
                        <option value="Soft">Soft</option>
                        <option value="Medium">Medium</option>
                      </Select>
                    </div>
                  </Form.Item>

                  <Form.Item name="LoanSize" label="Loan size">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <InputNumber style={{ width: "300px" }} min={1} />
                    </div>
                  </Form.Item>

                  <Form.Item name="TubeCapacity" label="Tube capacity">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <InputNumber style={{ width: "300px" }} min={1} />
                    </div>
                  </Form.Item>

                  <Form.Item name="Mode" label="Mode">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <Radio.Group
                        onChange={(e) => setMode(e.target.value)}
                        defaultValue={"Automatic"}
                        value={mode}
                      >
                        <Radio value={"Automatic"}>Automatic</Radio>
                        <Radio value={"Manual"}>Manual</Radio>
                      </Radio.Group>
                    </div>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      span: 12,
                      offset: 6,
                    }}
                  >
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Update
                      </Button>
                      <Button htmlType="reset">reset</Button>
                      {deviceMessage && <div>{deviceMessage}</div>}
                    </Space>
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
          </Row>

          {devices.map((device, idx) => (
            <>
              <Row style={{ paddingTop: "10px" }}>
                <Col span={2}>
                  <Text keyboard>{device?.config?.name}</Text>
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Unique ID:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device?._id} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>ID:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device?.config?.id} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Grass type:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device?.config?.grass} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>SoilType:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device?.config?.ground} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Light condition:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device?.config?.light} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Tube capacity:</Col>
                <Col style={{ width: "205px" }}>
                  <Input
                    disabled
                    defaultValue={device?.config?.liters_per_minute}
                  />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Mode:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device?.config?.mode} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Loan size:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device?.config?.size} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Humidity:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device?.humidity} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Added at: </Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device?.createdAt} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "15px", gap: "5px" }}>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      setSelectedDeviceId(devices[idx]._id);
                      showDeviceModal();
                    }}
                  >
                    Update device
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={async () => {
                      await removeDevice(device._id);
                    }}
                    type="primary"
                  >
                    Remove device
                  </Button>
                </Col>
              </Row>
              <Divider />
            </>
          ))}
        </Card>
      </Col>
    </Row>
  ) : (
    <Row>
      <Col span={24}>
        <Title>Loading...</Title>
      </Col>
    </Row>
  );
};

export default ProfilePage;
