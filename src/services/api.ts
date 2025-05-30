import axios, { AxiosResponse } from "axios";
import env from "../environment";
export type Api = Record<string | number, any>;

const api = axios.create({
  baseURL: env,
  headers: {
    "Content-Type": "application/json",
  },
});
const genericError = { message: "Something Went Wrong", status: 500 };

export function defaultCatch(
  error: Record<string, any>,
  reject: (val: Record<string, any>) => void
) {
  if (error.response) {
    reject(error.response);
  } else if (error.request) {
    reject(genericError);
  } else {
    reject(genericError);
  }
}

export function apiPromise(request: () => Promise<AxiosResponse>) {
  return new Promise<Record<string, any>>((resolve, reject) =>
    request()
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response) {
          reject(error.response);
        } else if (error.request) {
          reject(genericError);
        } else {
          reject(genericError);
        }
      })
  );
}

export function setHeaders(token: string, userId: string) {
  return {
    headers: {
      token: token,
      id: userId,
    },
  };
}

export default api;
