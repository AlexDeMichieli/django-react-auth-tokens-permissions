import axios from "axios";
import getJWT from "./getJWT";

const client = axios.create({
  baseURL: window.location.origin
});

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = async (request) => {
  let token = await getJWT()
  let newAccessToken = token.access
  if (isHandlerEnabled(request)) {
    request.headers["Authorization"] = `Bearer ${newAccessToken} `;
  }
  return request;
};

// Enable request interceptor
client.interceptors.request.use((request) => requestHandler(request));

const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
  }
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
  }
  return response;
};

client.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default client;
