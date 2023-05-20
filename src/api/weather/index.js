import axios from "axios";
import config from "../../config";
const weatherAPI = "weatherApi";

const GetTemperature = async (city) => {
  const response = await axios
    .get(`${config.path}${weatherAPI}/getTemp`, city)
    .then((response) => {
      console.log("🚀 get Success", response);
      return response.data;
    });
  //   console.log("🚀 get Success", response);

  return response;
};

export { GetTemperature };
