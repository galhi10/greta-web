import React, { useState } from "react";
import { Button, Form, } from "antd";
import "./index.css";
import {
  Select,
  Space,
  InputNumber,
  Radio,
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

  const ConfigPage = () =>{ 
    const [message, setMessage] = useState("");
    
    const onFinish =  async (values) => {
        const response = await ConfigPage(values.GrassType, values.Mode, values.LoanSize, values.SoilType,
             values.Region, values.TubeCapacity, values.LightCondition);
        console.log('Received values of form: ', values);
        setMessage(response);
      };

    return(
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
    >
      <h1 className="main-heading">System Configuration</h1>

      <Form.Item
        name="Region"
        label="Region"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your region!',
          },
        ]}
      >
  <Select style={{ width: '250px' }} placeholder="Please select a region">
         <option value="The Mountain Area">The Mountain Area</option>
         <option value="The Coastal Plain">The Coastal Plain</option>
         <option value="Negev and the Vallies">Negev and the Vallies</option>
         <option value="Eilat and the Arava">Eilat and the Arava</option>
        </Select>
      </Form.Item>
    
      <Form.Item
        name="LightCondition"
        label="Light"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select light conditions!',
          },
        ]}
      >
  <Select style={{ width: '250px' }} placeholder="Please select the light condition">
         <option value="Direct sun">Direct sun</option>
         <option value="Partial shade">Partial shade</option>
        </Select>
      </Form.Item>
      

      <Form.Item
        name="GrassType"
        label="Grass Type"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your grass type!',
          },
        ]}
      >
  <Select style={{ width: '250px' }} placeholder="Please select a grass type">
         <option value="A">A</option>
         <option value="B">B</option>
         <option value="C">C</option>
        </Select>
      </Form.Item>

      <Form.Item
        name="SoilType"
        label="Soil Type"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your soil type!',
          },
        ]}
      >
  <Select style={{ width: '250px' }} placeholder="Please select a soil type">
         <option value="Hard">Hard</option>
         <option value="Soft">Soft</option>
         <option value="Medium">Medium</option>
        </Select>
      </Form.Item>

      <Form.Item
      name = "LoanSize"
      label="Loan size"
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please insert loan size!',
        },
      ]}
>
  <InputNumber style={{ width: '250px' }} min={1} placeholder="Please insert loan size" />
      <span className="ant-form-text" style={{ marginLeft: 8 }}>
        Sqare Meters
      </span>
    </Form.Item>

    <Form.Item
      name = "TubeCapacity"
      label="Tube capacity"
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please insert tube capacity!',

        },
      ]}
>
<InputNumber style={{ width: '250px' }} min={1} placeholder="Please insert Tube capacity" />
      <span className="ant-form-text" style={{ marginLeft: 8 }}>
        Liters Per Minute
      </span>
    </Form.Item>

    <Form.Item
      name="Mode"
      label="Activation mode"
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please insert activation capacity!',

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
  )};


export default ConfigPage;