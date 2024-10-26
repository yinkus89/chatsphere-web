// RegistrationForm.jsx
import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Utility function for email validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setErrorMsg(""); // Reset error message
    setSuccessMsg(""); // Reset success message

    try {
      // Validate input
      if (!validateEmail(email)) {
        throw new Error("Invalid email format.");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      // Simulate a registration API call
      const response = await axios.post(
        "https://virtserver.swaggerhub.com/YINKAWLB/chatterbox1/1.0.0/auth/register",
        {
          email,
          password,
        }
      );

      // Display success message
      setSuccessMsg(response.data.message);
      setEmail(""); // Clear the email field
      setPassword(""); // Clear the password field
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      setErrorMsg(errorMessage);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
        <button type="submit">Register</button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
