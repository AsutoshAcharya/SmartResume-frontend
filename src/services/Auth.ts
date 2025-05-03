import api, { Api } from "./api";

const register = (arg: Api) => {
  return api.post("/register", arg.data);
};

const login = (arg: Api) => {
  return api.post("/login", arg.data);
};

export default { login, register } as const;
