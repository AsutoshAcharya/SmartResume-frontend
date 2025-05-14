import axios from "axios";
import api, { Api } from "./api";
let uploadInstance = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dtl3zxaep",
  headers: {
    "Content-Type": "application/json",
  },
});
let baseUrl = "/user";

const register = (arg: Api) => {
  return api.post(`${baseUrl}/register`, arg.data);
};

const login = (arg: Api) => {
  return api.post(`${baseUrl}/login`, arg.data);
};

const uploadFile = (arg: Api) => {
  return uploadInstance.post("/image/upload", arg.data, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "multipart/formdata",
    },
  });
};

export default { login, register, uploadFile } as const;
