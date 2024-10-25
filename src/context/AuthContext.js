import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken); // Fetch user data if token is available
    }
  }, []); // Empty dependency array

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('https://your-api-server.com/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      // Handle error here (e.g., logout if the token is invalid)
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://your-api-server.com/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      setToken(token);
      navigate('/chat');
    } catch (error) {
      setError('Invalid email or password');
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, token, error, resetError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
