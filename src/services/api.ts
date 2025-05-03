import axios from "axios";
import env from "../environment";
export type Api = Record<string | number, any>;
const api = axios.create({
  baseURL: env,
  headers: {
    "Content-Type": "application/json",
  },
});
export function setHeaders(token: string, userId: string) {
  return {
    headers: {
      "access-token": token,
      "access-user": userId,
    },
  };
}

export default api;
