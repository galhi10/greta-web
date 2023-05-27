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
} from "antd";
import Card from "../../components/antd/card";

import "./index.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useToken from "../../hooks/useToken";
import { deleteDevice, getDevices, setDevice } from "../../api/devices";

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

  const onDeviceFinish = useCallback(async (values) => {
    // insert here get devices
    const result = await setDevice({});
    console.log("🚀 ~ file: index.js:49 ~ onFinish ~ result:", result);

    setIsDeviceModelOpen(false);
  }, []);

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
                onOk={onProfileFinish}
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
          <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <Col>
              <Button type="primary" onClick={showDeviceModal}>
                Add new device
              </Button>
              <Modal
                title="Add new device"
                open={isDeviceModalOpen}
                onOk={onDeviceFinish}
                onCancel={handleDeviceCancel}
                okButtonProps={{
                  form: "deviceForm",
                  key: "submit",
                  htmlType: "submit",
                }}
              >
                <Form
                  name="update device"
                  id="deviceForm"
                  initialValues={{ remember: true }}
                  onFinish={onDeviceFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item name="device_name">
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Device name"
                    />
                  </Form.Item>
                  <Form.Item name="location">
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Location"
                    />
                  </Form.Item>

                  <Form.Item name="id">
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Identifier"
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
          </Row>

          {devices.map((device) => (
            <>
              <Row style={{ paddingTop: "10px" }}>
                <Col span={2}>
                  <Text keyboard>{device.sensor.model}</Text>
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Identifier:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device._id} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Location:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device.sensor.location} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Humidity:</Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device.humidity} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px", gap: "5px" }}>
                <Col style={{ width: "65px" }}>Added at: </Col>
                <Col style={{ width: "205px" }}>
                  <Input disabled defaultValue={device.createdAt} />
                </Col>
              </Row>
              <Row style={{ paddingTop: "15px", gap: "5px" }}>
                <Col>
                  <Button type="primary">Update device</Button>
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
