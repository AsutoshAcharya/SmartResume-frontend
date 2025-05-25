import api, { Api, apiPromise, setHeaders } from "./api";

let baseUrl = "/resume";

const addResume = (arg: Api) => {
  const headers = setHeaders(arg.token, arg.userId);
  return apiPromise(() => api.post(`${baseUrl}/add`, arg.data, { ...headers }));
};

const getResumesByUserId = (arg: Api) => {
  const headers = setHeaders(arg.token, arg.userId);
  return apiPromise(() =>
    api.get(`${baseUrl}/get_all/${arg.userId}`, { ...headers })
  );
};

const updateResume = (arg: Api) => {
  const headers = setHeaders(arg.token, arg.userId);
  return apiPromise(() =>
    api.patch(`${baseUrl}/update`, arg.data, { ...headers })
  );
};

const deleteResume = (arg: Api) => {
  const headers = setHeaders(arg.token, arg.userId);
  return apiPromise(() =>
    api.delete(`${baseUrl}/${arg.resumeId}`, { ...headers })
  );
};

const Resume = { addResume, getResumesByUserId, updateResume, deleteResume };

export default Resume;
