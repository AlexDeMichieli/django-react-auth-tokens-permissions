import axios from "axios";
import getJWT from "./getJWT";

const client = axios.create({
  baseURL: "http://127.0.0.1:9000/"
});

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = async (request) => {
  let token = await getJWT()
  console.log("TOKEN", token)
  let newAccessToken = token.access
  console.log("Intercepted request", newAccessToken);
  //TO REVISIT LATER
  if (isHandlerEnabled(request)) {
    console.log("REQUEST", request);
    // Modify request here
    request.headers["x-auth-token"] = newAccessToken;
  }
  return request;
};

// Enable request interceptor
client.interceptors.request.use((request) => requestHandler(request));

//   Axios response and error interceptors
const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    // Handle errors
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