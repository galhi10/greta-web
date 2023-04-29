import axios from "axios";

const configAPI = "Config";

const Config = async (grassType, Mode, LoanSize, soilType, Region, TubeCapacity, LightCondition) => {
  const body = {
    grassType,
    Mode,
    LoanSize,
    soilType,
    Region,
    TubeCapacity, 
    LightCondition
  };

  const response = await axios
    .post(`${config.path}${configAPI}/setConfig`, body)
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

export { Config };
