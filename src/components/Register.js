import React, { useState } from "react";
import axios from "axios"; // Axios for making API calls
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // Ensure you reference the global styles.css

const Register = () => {
  // State variables for form inputs and messages
  const [name, setName] = useState(""); // User name
  const [email, setEmail] = useState(""); // User email
  const [password, setPassword] = useState(""); // User password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Optionally: Add more complex password validation here

    setLoading(true); // Start loading state

    try {
      // Use the API URL for registration
      const response = await axios.post(
        "https://your-api-server.com/api/register", // Correct API endpoint
        {
          name,
          email,
          password,
        }
      );

      // Handle successful registration response
      if (response.status === 201) {
        setSuccessMessage("Registration successful! You can now log in.");
        setTimeout(() => {
          navigate("/login"); // Redirect to login after success
        }, 2000); // Delay for user to see success message

        // Reset form fields after successful registration
        resetForm();
      }
    } catch (err) {
      // Log error details for debugging
      console.error("Registration error:", err);
      // Handle API errors
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Registration failed. Please try again."
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6} // Minimum password length for better security
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6} // Minimum password length
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
