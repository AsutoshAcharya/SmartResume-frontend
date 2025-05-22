import axios from "axios";
import api, { Api, apiPromise, setHeaders } from "./api";
let uploadInstance = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dtl3zxaep",
  headers: {
    "Content-Type": "application/json",
  },
});
let baseUrl = "/resume";

const addResume = (arg: Api) => {
  const headers = setHeaders(arg.token, arg.userId);
  return apiPromise(() => api.post(`${baseUrl}/add`, arg.data, { ...headers }));
};

const Resume = { addResume };

export default Resume;
