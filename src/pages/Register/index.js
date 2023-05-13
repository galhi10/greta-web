import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { createUser } from "../../api/user";
import { Button, Col, Form, Input, Row, Typography, Alert } from "antd";
import Card from "../../components/antd/card";

import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";
import { delay } from "../../utils";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onFinish = async (values) => {
    console.log("🚀 ~ file: index.js:15 ~ onFinish ~ values:", values);
    const response = await createUser(
      values.email,
      values.password,
      values.firstName,
      values.lastName
    );
    console.log("🚀 ~ file: index.js:16 ~ onFinish ~ response:", response);
    if (response.status > 200) {
      setErrorMessage(response?.errors[0]?.param == "email" && "Invalid email");
    } else if (response.status == 200) {
      setErrorMessage("");
      setSuccessMessage("Success! Navigating to login page...");
      await delay(2000);
      navigate("/");
    } else if (!response.ok) {
      setErrorMessage(response.message);
    } else {
      setErrorMessage("Error! Please try again");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { Title } = Typography;

  return (
    <Card className={"card"}>
      <Title>Sign up</Title>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please input your First name!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First name"
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input your Last name!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last name"
          />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col span={24}>
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </Col>
          </Row>
        </Form.Item>

        {errorMessage && (
          <Row>
            <Col span={24}>
              <Alert type="error" message={errorMessage} banner />
            </Col>
          </Row>
        )}

        {successMessage && (
          <Row>
            <Col span={24}>
              <Alert type="success" message={successMessage} banner />
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};

export default RegisterPage;
