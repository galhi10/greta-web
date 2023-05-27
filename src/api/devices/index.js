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

export { setDevice, getDevices };
