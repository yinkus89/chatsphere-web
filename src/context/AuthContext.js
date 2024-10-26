import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  }, [navigate]);

  const fetchUserData = useCallback(
    async (token) => {
      try {
        const response = await axiosInstance.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        logout(); // Logout if token is invalid or fetching fails
      }
    },
    [logout]
  ); // Include logout in the dependency array

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken); // Fetch user data if token is available
    }
  }, [fetchUserData]); // Ensure the fetchUserData function is called on initial render

  const login = async (email, password) => {
    setLoading(true); // Set loading to true during the login process
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      navigate("/chat");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error); // Log error for debugging
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, token, error, loading, resetError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
