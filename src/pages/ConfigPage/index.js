import React, { useState } from "react";
import { Button, Form, } from "antd";
import "./index.css";
// import { Config } from "../../api/config";

import {Select, Space, Input, InputNumber, Radio, Card,} from 'antd';

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

  const ConfigPage = () =>{ 
    const [message, setMessage] = useState("");
    
    const onFinish =  async (values) => {
        // const response = await Config(values.GrassType, values.Mode, values.LoanSize, values.SoilType,
        //      values.Region, values.TubeCapacity, values.LightCondition);
        console.log('Received values of form: ', values);
        // setMessage(response);
      };

    return(
    <Card className="card">
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
    >
      <h1 className="main-heading">System Configuration</h1>

      <Form.Item
        name="Region"
        label="Region"
        rules={[
          {
            required: true,
            message: 'Please select your region!',
          },
        ]}
      >
  <Select style={{ width: '300px' }} placeholder="Please select a region" options={[
        {
          value: 'The Mountain Area',
          label: 'The Mountain Area',
        },
        {
          value: 'The Coastal Plain',
          label: 'The Coastal Plain',
        },
        {
          value: 'Negev and the Vallies',
          label: 'Negev and the Vallies',
        },
        {
          value: 'Eilat and the Arava',
          label: 'Eilat and the Arava',
        },
      ]} >
        </Select>
      </Form.Item>
    
      <Form.Item
        name="LightCondition"
        label="Light Condition"
        rules={[
          {
            required: true,
            message: 'Please select light conditions!',
          },
        ]}
      >
  <Select style={{ width: '300px' }} placeholder="Please select  light condition">
         <option value="Direct sun">Direct sun</option>
         <option value="Partial shade">Partial shade</option>
        </Select>
      </Form.Item>
      

      <Form.Item
        name="GrassType"
        label="Grass Type"
        rules={[
          {
            required: true,
            message: 'Please select your grass type!',
          },
        ]}
      >
  <Select style={{ width: '300px' }} placeholder="Please select a grass type">
         <option value="A">A</option>
         <option value="B">B</option>
         <option value="C">C</option>
        </Select>
      </Form.Item>

      <Form.Item
        name="SoilType"
        label="Soil Type"
        rules={[
          {
            required: true,
            message: 'Please select your soil type!',
          },
        ]}
      >
  <Select style={{ width: '300px' }} placeholder="Please select a soil type">
         <option value="Hard">Hard</option>
         <option value="Soft">Soft</option>
         <option value="Medium">Medium</option>
        </Select>
      </Form.Item>

      <Form.Item
      name = "LoanSize"
      label="Loan size"
      rules={[
        {
          required: true,
          message: 'Please insert loan size!',
        },
      ]}
><InputNumber style={{ width: '300px' }} min={1} placeholder="Insert loan size (Square Meters)" />
    </Form.Item>

    <Form.Item
      name = "TubeCapacity"
      label="Tube capacity"
      rules={[
        {
          required: true,
          message: 'Insert tube capacity!',
        },
      ]}
>
    <InputNumber style={{ width: '300px' }} min={1} placeholder="Insert tube capacity (Liters Per Minute)" /> 
    </Form.Item>

    <Form.Item
      name="Mode"
      label="Activation mode"
      rules={[
        {
          required: true,
          message: 'Insert activation mode!',

        },
      ]}>
      <Radio.Group>
        <Radio value="Automatic">Automatic</Radio>
        <Radio value="Manual">Manual</Radio>
      </Radio.Group>
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
    </Card>
  )};

export default ConfigPage;