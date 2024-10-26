// src/services/axiosConfig.js
import axios from "axios";

// Use environment variable for the base URL or fallback to a default
const API_URL = process.env.REACT_APP_API_URL || "https://your-api-server.com";

// Create an Axios instance with the base URL and default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the token to every request if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response.data);
      throw new Error(
        error.response.data.message || "An error occurred. Please try again."
      );
    } else if (error.request) {
      console.error("Request error:", error.request);
      throw new Error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      console.error("Error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
);

export default axiosInstance;
