import React, { useState } from "react";
import { AutoComplete, Button, Form } from "antd";
import "./index.css";
import { Select, Space, Input, InputNumber, Radio, Card } from "antd";
import { SetConfig } from "../../api/configuration";
import { GetConfig } from "../../api/configuration";
import useToken from "../../hooks/useToken";
import config from "../../config";
import { useEffect } from "react";
import { getCities } from "../../api/weather";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const ConfigPage = () => {
  const [message, setMessage] = useState("");
  const [config, setConfig] = useState({});
  const [cities, setCities] = useState([]);
  const [mode, setMode] = useState(undefined);

  const onChange = (e) => {
    setMode(e.target.value);
  };
  const { token } = useToken();
  const onFinish = async (values) => {
    const response = await SetConfig(
      values.GrassType,
      values.Mode,
      values.LoanSize,
      values.SoilType,
      values.Region,
      values.TubeCapacity,
      values.LightCondition,
      token
    );
    if (response) {
      setMessage("successfully updated");
    } else {
      setMessage("Update was not successful. Please try again");
    }
  };

  useEffect(() => {
    // make it as default values, so we'll be able to change only one field to submit
    async function fetchData() {
      const response2 = await GetConfig(token);
      setConfig({ ...response2 });
    }
    fetchData();
  }, []);

  useEffect(() => {
    // make it as default values, so we'll be able to change only one field to submit
    async function fetchCities() {
      const fetchedCities = await getCities();

      function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
      }

      // usage example:
      var uniqueCities = fetchedCities.filter(onlyUnique);
      const cities = [];
      for (const city of uniqueCities) {
        cities.push({
          value: city,
          label: city,
        });
      }

      setCities(cities);
    }
    fetchCities();
  }, []);

  return (
    <Card className="card">
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <h1 className="main-heading">System Configuration</h1>

        <Form.Item
          name="Region"
          label="Region"
          rules={[
            {
              required: true,
              message: "Please select your region!",
            },
          ]}
        >
          <Select
            style={{ width: "300px" }}
            placeholder={config.location}
            // defaultValue={config.location}
            showSearch
            options={cities}
            clearIcon
          ></Select>
        </Form.Item>

        <Form.Item
          name="LightCondition"
          label="Light Condition"
          rules={[
            {
              required: true,
              message: "Please select light conditions!",
            },
          ]}
        >
          <Select style={{ width: "300px" }} placeholder={config.light}>
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
              message: "Please select your grass type!",
            },
          ]}
        >
          <Select style={{ width: "300px" }} placeholder={config.grass}>
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
              message: "Please select your soil type!",
            },
          ]}
        >
          <Select style={{ width: "300px" }} placeholder={config.ground}>
            <option value="Hard">Hard</option>
            <option value="Soft">Soft</option>
            <option value="Medium">Medium</option>
          </Select>
        </Form.Item>

        <Form.Item
          name="LoanSize"
          label="Loan size"
          rules={[
            {
              required: true,
              message: "Please insert loan size!",
            },
          ]}
        >
          <InputNumber
            style={{ width: "300px" }}
            min={1}
            placeholder={config.size}
          />
        </Form.Item>

        <Form.Item
          name="TubeCapacity"
          label="Tube capacity"
          rules={[
            {
              required: true,
              message: "Insert tube capacity!",
            },
          ]}
        >
          <InputNumber
            style={{ width: "300px" }}
            min={1}
            placeholder={config.liters_per_minute}
          />
        </Form.Item>

        <Form.Item
          name="Mode"
          label="Mode"
          rules={[
            {
              required: true,
              message: "Insert activation mode!",
            },
          ]}
        >
          {config.mode ? (
            <Radio.Group
              onChange={onChange}
              defaultValue={config.mode}
              value={mode}
            >
              <Radio value={"Automatic"}>Automatic</Radio>
              <Radio value={"Manual"}>Manual</Radio>
            </Radio.Group>
          ) : (
            <Radio.Group onChange={onChange} value={mode}>
              <Radio value={"Automatic"}>Automatic</Radio>
              <Radio value={"Manual"}>Manual</Radio>
            </Radio.Group>
          )}
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
            {message && <div>{message}</div>}
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ConfigPage;
