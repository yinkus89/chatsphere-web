import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useAuth(); // Assuming user will be null if not authenticated

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
