import axios from 'axios';
import jwt_decode from "jwt-decode";

//replaces the token in localstorage with a new token
const setToken = ({ access, refresh }) => {

  localStorage.setItem("token", JSON.stringify(access));
  localStorage.setItem("refreshToken", JSON.stringify(refresh));
  console.log('setting new tokens');
};

//if the refresh token is still valid, it makes a call to get a new generated auth token and refresh token
const getJWT = async () => {

  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
  const decoded = jwt_decode(refreshToken);
  const expiration = decoded.exp
  if (expiration > Date.now() / 1000) {
    console.log('REFRESH TOKEN VALID', refreshToken)
    console.log('refreshing token')

    try {
      const response = await axios.post(`api/token/refresh/`, { refresh: refreshToken })
      console.log("RESPONSE WITH NEW TOKENS", response.data)
      const newTokens = response.data
      setToken(newTokens);
      return newTokens;
    } catch (error) {
      console.log(error)
    }

  } else {
    console.log('Logging Out, REFRESH TOKEN EXPIRED')
  }
};

export default getJWT;