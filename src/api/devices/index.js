import axios from "axios";
import config from "../../config";

const devicesAPI = "devices";

const setDevice = async (token, device) => {
  const response = await axios
    .post(`${config.path}${devicesAPI}/setDevice`, device, {
      headers: {
        Authorization: `Berear ${token}`,
      },
    })
    .then(async (response) => {
      console.log("🚀 ~ file: user.js:14 ~ .then ~ response:", response);
      return response.data.data;
    })
    .catch(async (error) => {
      console.log("🚀 ~ file: user.js:17 ~ login ~ error:", error);
      return error.response.data;
    });
  return response;
};

const createDevice = async (token, device) => {
  const response = await axios
    .put(`${config.path}${devicesAPI}/create`, device, {
      headers: {
        Authorization: `Berear ${token}`,
      },
    })
    .then(async (response) => {
      console.log("🚀 ~ file: user.js:14 ~ .then ~ response:", response);
      return response.data.data;
    })
    .catch(async (error) => {
      console.log("🚀 ~ file: user.js:17 ~ login ~ error:", error);
      return error.response.data;
    });
  return response;
};

const getDevices = async (token) => {
  const response = await axios
    .get(`${config.path}${devicesAPI}/getDevicesId`, {
      headers: {
        Authorization: `Berear ${token}`,
      },
    })
    .then(async (response) => {
      console.log("🚀 ~ file: user.js:14 ~ .then ~ response:", response);
      return response.data;
    })
    .catch(async (error) => {
      console.log("🚀 ~ file: user.js:17 ~ login ~ error:", error);
      return error.response.data;
    });
  return response;
};

const deleteDevice = async (token, id) => {
  console.log("🚀 ~ file: index.js:43 ~ deleteDevice ~ id:", id);
  const response = await axios
    .delete(`${config.path}${devicesAPI}/deleteDevice`, {
      headers: {
        Authorization: `Berear ${token}`,
      },
      data: {
        id,
      },
    })
    .then(async (response) => {
      console.log("🚀 ~ file: user.js:14 ~ .then ~ response:", response);
      return response.data.data;
    })
    .catch(async (error) => {
      console.log("🚀 ~ file: user.js:17 ~ login ~ error:", error);
      return error.response.data;
    });
  return response;
};

export { setDevice, getDevices, deleteDevice, createDevice };
