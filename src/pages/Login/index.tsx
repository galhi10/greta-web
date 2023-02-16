import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Form, Input, Row } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";


const Login: React.FC = () => {
  const [isError, setError] = useState<boolean>(false)
  const navigate = useNavigate();
  const onFinish = async (params: any) => {
    console.log("Received values of form: ", params);
    return await axios
      .post("http://localhost:3001/api/users/login", {
        email: params.email,
        password: params.password
      })
      .then((response) => {
        console.log(response);
        window.localStorage.setItem('token', response.data.data.token)
        navigate('/dashboard')
      }).catch( (err) => {
        setError(true);
      })
  };

  useEffect(() => {
    if(isError) setTimeout(() => {
      setError(false)
    }, 3 * 1000);
  
    return () => {
    }
  }, [isError])
  

  return (
    <Row
      justify="space-around"
      align="middle"
      style={{ height: "100vh"}}
    >
      <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
        <Card
          style={{
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <Row style={{ marginBottom: 30 }}>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <img src="/assets/football-logo.jpg" className="login-logo" />
            </Col>
          </Row>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
          >
            <Row>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              {isError && <Alert style={{textAlign:"left"}} message="Bad email or password" type="error" showIcon />}
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                </Form.Item>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
                
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                   <a href="">Register now</a>
                </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
