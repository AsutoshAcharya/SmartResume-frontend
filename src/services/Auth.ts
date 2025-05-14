import axios from "axios";
import api, { Api, apiPromise } from "./api";
let uploadInstance = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dtl3zxaep",
  headers: {
    "Content-Type": "application/json",
  },
});
let baseUrl = "/user";

const register = (arg: Api) => {
  return apiPromise(() => api.post(`${baseUrl}/register`, arg.data));
};

const login = (arg: Api) => {
  return apiPromise(() => api.post(`${baseUrl}/login`, arg.data));
};

const uploadFile = (arg: Api) => {
  return uploadInstance.post("/image/upload", arg.data, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "multipart/formdata",
    },
  });
};

const Auth = { login, register, uploadFile };

export default Auth;
