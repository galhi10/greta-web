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

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [devices, setDevices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProfileModalOpen, setIsProfileModelOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModelOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { token } = useToken();

  return (
    <Row>
      <Col span={24}>
        <Card title={<Title level={2}>Dashboard</Title>} bordered={false}>
          <Row>
            <Col>hasdjas</Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardPage;
