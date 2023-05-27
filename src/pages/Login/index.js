import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import gretaLogo from "../../../src/pages/MainPage/logo.jpg";

import { login } from "../../api/user";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import Card from "../../components/antd/card";

import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({ setToken, token }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const response = await login(values.email, values.password);
    setToken(response.token);
    navigate("/MainPage");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { Title } = Typography;

  return !token ? (
    <>
      <Row justify={"center"}>
        <Col style={{ textAlign: "center" }} span={12}>
          <img
            src={gretaLogo}
            alt="Girl in a jacket"
            width="250"
            height="250"
            style={{ padding: "50px" }}
          />
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col span={12}>
          <Card className={"card"}>
            <Title>Sign in</Title>
            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Row>
                  <Col span={12}>
                    <Button type="primary" htmlType="submit">
                      Log in
                    </Button>
                  </Col>
                  <Col style={{ textAlign: "end" }} span={12}>
                    <Button
                      type="primary"
                      htmlType="button"
                      style={{ backgroundColor: "grey" }}
                      onClick={() => navigate("/register")}
                    >
                      Sign up
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    <Navigate to={"/MainPage"} />
  );
};

export default Login;
