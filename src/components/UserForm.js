import React, { useState } from "react";
import axios from "axios";
import "../styles/styles.css"; // Ensure to import global styles

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true); // Set loading to true to indicate submission

    try {
      // Use the provided API URL for registration
      const response = await axios.post(
        "https://your-api-server.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // Assuming the response contains the user data
      setSuccessMessage("Registration successful! You can now log in.");
      // Optionally reset the form fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Registration failed. Please try again."
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
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
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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

export default UserForm;
