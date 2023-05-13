import axios from "axios";
import config from "../../config";
const configAPI = "Config";

const SetConfig = async (
  grass,
  mode,
  size,
  ground,
  location,
  liters_per_minute,
  light,
  token
) => {
  const body = {
    config: { grass, mode, size, ground, location, liters_per_minute, light },
  };
  console.log("body amir", body);
  const response = await axios
    .post(`${config.path}${configAPI}/setConfig`, body, {
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

export { SetConfig };
