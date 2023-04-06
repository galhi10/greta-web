import React, { useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { login } from "../api/user";
import {Button, Checkbox, Col, Form, Input, Row, Typography} from "antd";
import Card from "../components/antd/card";

import "./LoginPage.css";

const LoginPage = () => {

  const onFinish = async (values) => {
    console.log("Success:", values);
    const response = await login(values.email, values.password);
    console.log(
        "🚀 ~ file: LoginPage.js:13 ~ onLoginClick ~ response:",
        response
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const {Title} = Typography

  return (
    <Card className={"card"}>
      <Title>Greta</Title>
      <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}

      >
        <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
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
            <Col span={12} >
              <Button type="primary" htmlType="submit" >
                Log in
              </Button>
            </Col>
            <Col span={12} >
              <Button type="primary" htmlType="button"  style={{backgroundColor: "grey" }} >
                Sign up
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;
