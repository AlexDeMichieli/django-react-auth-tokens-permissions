import jwt_decode from "jwt-decode";
import axios from "axios";

const setToken = ({ access, refresh }) => {
  localStorage.setItem("token", JSON.stringify(access));
  localStorage.setItem("refreshToken", JSON.stringify(refresh));
};

const getJWT = async () => {

  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
  const decoded = jwt_decode(refreshToken);
  const expiration = decoded.exp
  if (expiration > Date.now() / 1000) {

    try {
      const response = await axios.post(`http://0.0.0.0/api/token/refresh/`, { refresh: refreshToken })
      const newTokens = response.data
      setToken(newTokens)
      return newTokens;
    } catch (error) {
      console.log(error)
    }

  } else {
    window.location.assign("/");
  }
};

export default getJWT;