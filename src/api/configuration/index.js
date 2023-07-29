import axios from "axios";
import config from "../../config";
const configAPI = "Config";

const GetConfig = async (token) => {
  const response = await axios
    .get(`${config.path}${configAPI}/getConfig`, {
      headers: {
        Authorization: `Berear ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
  console.log("🚀 get Success", response);

  return response;
};

const SetConfig = async (country, city, token) => {
  const body = {
    config: {
      country,
      city,
    },
  };
  const response = await axios
    .post(`${config.path}${configAPI}/setConfig`, body, {
      headers: {
        Authorization: `Berear ${token}`,
      },
    })
    .then(async (response) => {
      console.log("🚀 Great Success", response);
      return response.data;
    })
    .catch(async (error) => {
      console.log("🚀 Response error", error);
      return error.response.data;
    });
  return response;
};

export { SetConfig };
export { GetConfig };
