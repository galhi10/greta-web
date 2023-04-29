import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { login } from "../../api/user";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";

import Card from "../../components/antd/card";
const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;

// import React, { useState } from 'react';
import "./index.css";


// // function ConfigPage() {
//   return (
//       <Row justify="start">
//         <Col span={8} offset = {2}>
//           <h1 className="main-heading">Greta</h1>
//         </Col>
//       </Row>
//   );
// }


import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const ConfigPage = () => (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
    >
      <h1 className="main-heading">System Configuration</h1>
      <Form.Item
        name="select region"
        label="Region"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your region!',
          },
        ]}
      >
        <Select placeholder="Please select a region">
         <option value="The Mountain Area">The Mountain Area</option>
         <option value="The Coastal Plain">The Coastal Plain</option>
         <option value="Negev and the Vallies">Negev and the Vallies</option>
         <option value="Eilat and the Arava">Eilat and the Arava</option>
        </Select>
      </Form.Item>
    
      <Form.Item
        name="select light condition"
        label="Light"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select light conditions!',
          },
        ]}
      >
        <Select placeholder="Please select light conditions">
         <option value="Direct sun">Direct sun</option>
         <option value="Partial shade">Partial shade</option>
        </Select>
      </Form.Item>

      <Form.Item
        name="select grass type"
        label="Grass Type"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your grass type!',
          },
        ]}
      >
        <Select placeholder="Please select your grass type">
         <option value="A">A</option>
         <option value="B">B</option>
         <option value="C">C</option>
        </Select>
      </Form.Item>

      <Form.Item
        name="select soil type"
        label="Soil Type"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your soil type!',
          },
        ]}
      >
        <Select placeholder="Please select your soil type">
         <option value="Hard">Hard</option>
         <option value="Soft">Soft</option>
         <option value="Medium">Medium</option>
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );


export default ConfigPage;