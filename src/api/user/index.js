import axios from "axios";
import config from "../../config";

const userAPI = "user";

const login = async (email, password) => {
  const body = {
    email,
    password,
  };
  const response = await axios
    .post(`${config.path}${userAPI}/login`, body)
    .then(async (response) => {
      console.log("🚀 ~ file: user.js:14 ~ .then ~ response:", response);
      return response;
    })
    .catch(async (error) => {
      console.log("🚀 ~ file: user.js:17 ~ login ~ error:", error);
      return error.response.data;
    });
  return response;
};

export { login };
