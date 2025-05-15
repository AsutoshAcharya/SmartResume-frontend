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
  console.log(error, "err apiPromise");
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
        console.log(error);
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
      "access-token": token,
      "access-user": userId,
    },
  };
}

export default api;
