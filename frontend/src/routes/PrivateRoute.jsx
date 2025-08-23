import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (tokenExpiry) {
    const now = Date.now();
    if (now >= parseInt(tokenExpiry, 10)) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiry");
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
