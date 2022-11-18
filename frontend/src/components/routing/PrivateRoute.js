import React from "react";
import {Navigate } from "react-router-dom";
import Blog from "../Blog/Blog";
const PrivateRoute = () => {
 
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  console.log('PRIVATE ROUTE')
  if (!isAuthenticated) {
    return <Navigate to="/" />
  }
  else {
    return <Blog />
  }
}


export default PrivateRoute;