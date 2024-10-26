// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path as necessary

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Replace with your actual authentication logic

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
