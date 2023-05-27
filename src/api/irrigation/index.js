import axios from "axios";
import config from "../../config";
const irrigationAPI = "irrigation";

const getSchedule = async (token) => {
  const response = await axios
    .get(`${config.path}${irrigationAPI}/getIrregSec`, {
      headers: {
        Authorization: `Berear ${token}`,
      },
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

const runAlgo = async (token) => {
  const response = await axios
    .post(
      `${config.path}${irrigationAPI}/startAlgo`,
      {},
      {
        headers: {
          Authorization: `Berear ${token}`,
        },
      }
    )
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

export { getSchedule, runAlgo };
