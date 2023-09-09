import React, { useState } from "react";
import { AutoComplete, Button, Form } from "antd";
import "./index.css";
import { Select, Space, Input, InputNumber, Radio, Card } from "antd";
import { SetConfig } from "../../api/configuration";
import { GetConfig } from "../../api/configuration";
import useToken from "../../hooks/useToken";
import config from "../../config";
import { useEffect } from "react";
import { getCities, getCountries } from "../../api/weather";
import { createDevice } from "../../api/devices";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const ConfigPage = () => {
  const [configMessage, setConfigMessage] = useState("");
  const [deviceMessage, setDeviceMessage] = useState("");
  const [config, setConfig] = useState({});
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [countries, setCountries] = useState([]);
  const [mode, setMode] = useState(undefined);

  const onChange = (e) => {
    setMode(e.target.value);
  };
  const { token } = useToken();
  const onSystemConfigFinish = async (values) => {
    const response = await SetConfig(values.Country, values.City, token);
    if (response) {
      setConfigMessage("successfully updated");
    } else {
      setConfigMessage("Update was not successful. Please try again");
    }
  };

  const onNewSensorFinish = async (values) => {
    const response = await createDevice(token, {
      config: {
        id: values.deviceId,
        mode: values.Mode,
        name: values.deviceName,
        grass: values.GrassType,
        size: values.LoanSize,
        ground: values.SoilType,
        liters_per_minute: values.TubeCapacity,
        light: values.LightCondition,
      },
    });

    if (response.ok) {
      setDeviceMessage(
        "New device created successfully, Note that minimun and maximun humidity values will be added according to device configuration options"
      );
    } else {
      setDeviceMessage("Update was not successful. Please try again");
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
    async function fetchCountries() {
      const fetchedCountries = await getCountries(token);

      const countries = [];
      for (const country of fetchedCountries) {
        countries.push({
          value: country,
          label: country == "IL" ? "Israel" : "Island",
        });
      }
      setCountries(countries);
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    // make it as default values, so we'll be able to change only one field to submit
    async function fetchCities(selectedCountry) {
      const fetchedCities = await getCities(selectedCountry);

      function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
      }

      const uniqueCities = fetchedCities.filter(onlyUnique);
      const cities = [];
      for (const city of uniqueCities) {
        cities.push({
          value: city,
          label: city,
        });
      }

      setCities(cities);
    }
    fetchCities(selectedCountry);
  }, [selectedCountry]);

  const onCountrySelection = (value) => {
    setSelectedCountry(value);
  };

  return (
    <Card className="card">
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onSystemConfigFinish}
      >
        <h1 className="main-heading">System Configuration</h1>

        <Form.Item
          name="Country"
          label="Country"
          rules={[
            {
              required: true,
              message: "Please select your country!",
            },
          ]}
        >
          <Select
            style={{ width: "300px" }}
            placeholder={config.country}
            showSearch
            options={countries}
            clearIcon
            onChange={onCountrySelection}
          ></Select>
        </Form.Item>

        <Form.Item
          name="City"
          label="City"
          rules={[
            {
              required: true,
              message: "Please select your city!",
            },
          ]}
        >
          <Select
            style={{ width: "300px" }}
            placeholder={config.city}
            showSearch
            options={cities}
            clearIcon
          ></Select>
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
            {configMessage && <div>{configMessage}</div>}
          </Space>
        </Form.Item>
      </Form>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onNewSensorFinish}
      >
        <h1 className="main-heading">New sensor</h1>

        <Form.Item
          name="deviceId"
          label="Device ID"
          rules={[
            {
              required: true,
              message: "Please insert device ID!",
            },
          ]}
        >
          <InputNumber style={{ width: "300px" }} min={0} />
        </Form.Item>

        <Form.Item
          name="deviceName"
          label="Device name"
          rules={[
            {
              required: true,
              message: "Please insert device name!",
            },
          ]}
        >
          <Input style={{ width: "300px" }} min={0} />
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
          <Select style={{ width: "300px" }}>
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
          <Select style={{ width: "300px" }}>
            <option value="Ryegrass">Ryegrass</option>
            <option value="Floratam">Floratam</option>
            <option value="Fine Fescue">Fine Fescue</option>
            <option value="Bluegrass">Bluegrass</option>
            <option value="Bentgrass">Bentgrass</option>
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
          <Select style={{ width: "300px" }}>
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
          <InputNumber style={{ width: "300px" }} min={1} />
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
          <InputNumber style={{ width: "300px" }} min={1} />
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
          <Radio.Group onChange={onChange} value={mode}>
            <Radio value={"Automatic"}>Automatic</Radio>
            <Radio value={"Manual"}>Manual</Radio>
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
              Add
            </Button>
            <Button htmlType="reset">reset</Button>
            {deviceMessage && <div>{deviceMessage}</div>}
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ConfigPage;
