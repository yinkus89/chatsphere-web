import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // Reference global styles.css

const Login = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    resetMessages(); // Reset messages on submit
    setLoading(true); // Start loading

    try {
      const { data } = await axios.post(
        "https://your-api-server.com/api/auth/login", // Correct API endpoint
        { email, password }
      );

      // Handle successful login response
      handleLoginSuccess(data);
    } catch (err) {
      handleLoginError(err);
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  const resetMessages = () => {
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message
  };

  const handleLoginSuccess = (data) => {
    const { token, user } = data; // Destructure response
    if (token) {
      localStorage.setItem("token", token); // Store JWT token for authentication
      setSuccessMessage("Login successful! Redirecting to your profile...");

      setTimeout(() => {
        navigate(`/profile/${user.id}`); // Redirect to user profile using user ID
      }, 2000); // Delay navigation to allow user to see success message
    } else {
      setError("Login failed. Please try again."); // Fallback error message
    }
  };

  const handleLoginError = (err) => {
    if (err.response && err.response.data) {
      setError(
        err.response.data.message ||
          "Invalid email or password. Please try again."
      ); // Set error message from server response
    } else {
      setError("An unexpected error occurred. Please try again."); // Fallback error message
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {error && (
        <div className="error" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="success" role="alert" aria-live="assertive">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$" // Simple email format validation
            title="Please enter a valid email address"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6" // Minimum length validation
            title="Password must be at least 6 characters"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
