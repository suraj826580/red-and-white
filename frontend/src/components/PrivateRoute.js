import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token")) || false;
  return token ? children : <Navigate to={"/"} />;
};

export default PrivateRoute;
