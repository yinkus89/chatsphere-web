import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // Reference global styles.css

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages(); // Reset messages on submit
    setLoading(true); // Start loading

    try {
      // Update the URL to match your API endpoint
      const { data } = await axios.post(
        "https://your-api-server.com/api/auth/login", // Correct API endpoint
        {
          email,
          password,
        }
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
    setError("");
    setSuccessMessage("");
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
      setError("Login failed. Please try again.");
    }
  };

  const handleLoginError = (err) => {
    // Check if the error response is from the server
    if (err.response && err.response.data) {
      setError(
        err.response.data.message ||
          "Invalid email or password. Please try again."
      );
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="success" role="alert">
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
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
