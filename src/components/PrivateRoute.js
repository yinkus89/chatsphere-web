import { Navigate } from "react-router-dom"; // Keep only Navigate
import { useAuth } from "../context/AuthContext"; // Import useAuth

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Get user data from AuthContext

  return user ? children : <Navigate to="/login" />; // Navigate to login if user is not authenticated
};

export default PrivateRoute;
