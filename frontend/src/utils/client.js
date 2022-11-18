import axios from "axios";
import getJWT from "./getJWT";

const client = axios.create({
  baseURL: "http://0.0.0.0/"
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
    request.headers["x-auth-token"] = newAccessToken;
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