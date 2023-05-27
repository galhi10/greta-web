import axios from "axios";
import config from "../../config";
const weatherAPI = "weatherApi";

// to complete
const GetTemperature = async (city) => {
  const body = {
    config: { city: "Haifa" },
  };
  console.log("city is:", response);
  const response = await axios
    .get(`${config.path}${weatherAPI}/getTemp`, body)
    .then((response) => {
      console.log("🚀 get Success", response);
      return response.data;
    });
  //   console.log("🚀 get Success", response);

  return response;
};

export { GetTemperature };
