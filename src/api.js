import axios from "axios";

const Error = {
  UNAUTHORIZED: 401
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (error) => {
    const {response} = error;

    if (response === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw error;
    }
    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
