// src/components/Logout.js
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../services/api"; // Ensure this matches your API file path

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call your logout function (if you have one, or just clear local storage)
        logoutUser(); // If you have a logoutUser function, call it here.
        localStorage.removeItem("token"); // Clear token from local storage
        history.push("/login"); // Redirect to the login page
      } catch (error) {
        console.error("Logout error:", error); // Handle any errors
      }
    };

    handleLogout();
  }, [history]);

  return (
    <div>
      <h2>Logging out...</h2>
      <p>You will be redirected shortly.</p>
    </div>
  );
};

export default Logout;
