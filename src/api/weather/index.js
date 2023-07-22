import axios from "axios";
import config from "../../config";
const weatherAPI = "weatherApi";

// to complete
const GetTemperature = async (city) => {
  console.log("city is:", city);
  const response = await axios
    .post(`${config.path}${weatherAPI}/getTemp`, {
      city,
    })
    .then((response) => {
      console.log("🚀 get Success", response);
      return response.data;
    })
    .catch(async (error) => {
      console.log("🚀 Response error", error);
      return error.response.data;
    });

  return response;
};

const getWeatherAlert = async (city, country) => {
  const response = await axios
    .post(`${config.path}${weatherAPI}/getWeatherAlert`, {
      city,
      country,
    })
    .then((response) => {
      console.log("🚀 get Success", response);
      return response.data;
    })
    .catch(async (error) => {
      console.log("🚀 Response error", error);
      return error.response.data;
    });

  return response;
};

const getHumidity = async (city) => {
  const response = await axios
    .post(`${config.path}${weatherAPI}/getAirHumidity`, {
      city,
    })
    .then((response) => {
      console.log("🚀 get Success", response);
      return response.data;
    })
    .catch(async (error) => {
      console.log("🚀 Response error", error);
      return error.response.data;
    });

  return response;
};

const getCities = async (country) => {
  const response = await axios
    .post(`${config.path}${weatherAPI}/getCitiesList`, {
      country,
    })
    .then((response) => {
      console.log("🚀 get Success", response);
      return response.data;
    })
    .catch(async (error) => {
      console.log("🚀 Response error", error);
      return error.response.data;
    });

  return response;
};

const getCountries = async () => {
  const response = await axios
    .get(`${config.path}${weatherAPI}/getCountriesList`)
    .then((response) => {
      console.log("🚀 get Success", response);
      return response.data;
    })
    .catch(async (error) => {
      console.log("🚀 Response error", error);
      return error.response.data;
    });

  return response;
};
export {
  GetTemperature,
  getCities,
  getHumidity,
  getCountries,
  getWeatherAlert,
};
