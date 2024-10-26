import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api"; // Ensure this matches your API file path

const Logout = () => {
  const [loading, setLoading] = useState(true); // Loading state to indicate logout process
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call your logout function if applicable
        await logoutUser(); // If you have a logoutUser function, await its completion
        localStorage.removeItem("token"); // Clear token from local storage
        setLoading(false); // Update loading state
        navigate("/login"); // Redirect to the login page
      } catch (error) {
        console.error("Logout error:", error); // Handle any errors
        setLoading(false); // Update loading state even on error
        // Optionally, you could redirect to an error page or show a message
      }
    };

    handleLogout();
  }, [navigate]); // Dependency on navigate to avoid warnings

  return (
    <div>
      {loading ? (
        <>
          <h2>Logging out...</h2>
          <p>You will be redirected shortly.</p>
        </>
      ) : (
        <p>Logout successful!</p>
      )}
    </div>
  );
};

export default Logout;
