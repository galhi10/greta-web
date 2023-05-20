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
      return response.data.data;
    })
    .catch(async (error) => {
      console.log("🚀 ~ file: user.js:17 ~ login ~ error:", error);
      return error.response.data;
    });
  return response;
};

const createUser = async (email, password, firstName, lastName) => {
  const body = {
    email,
    password,
    firstName,
    lastName,
  };
  const response = await axios
    .put(`${config.path}${userAPI}/create`, body)
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

const getUser = async (token) => {
  const response = await axios
    .get(`${config.path}${userAPI}/`, {
      headers: {
        Authorization: `Berear ${token}`,
      },
    })
    .then(async (response) => {
      console.log("🚀 ~ file: user.js:14 ~ .then ~ response:", response.data);
      return response.data;
    })
    .catch(async (error) => {
      console.log("🚀 ~ file: user.js:17 ~ login ~ error:", error);
      return error.response.data;
    });
  return response;
};

const updateUser = async (body, token) => {
  console.log("🚀 ~ file: index.js:63 ~ updateUser ~ body:", body);
  const response = await axios
    .post(`${config.path}${userAPI}/update`, body, {
      headers: {
        Authorization: `Berear ${token}`,
      },
    })
    .then(async (response) => {
      console.log("🚀 ~ file: user.js:14 ~ .then ~ response:", response.data);
      return response.data;
    })
    .catch(async (error) => {
      console.log("🚀 ~ file: user.js:17 ~ login ~ error:", error);
      return error.response.data;
    });
  return response;
};

export { login, createUser, getUser, updateUser };
