import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/styles.css"; // Reference global styles.css

const Profile = () => {
  const { id } = useParams(); // Get user ID from URL
  const { user, token } = useAuth(); // Get user info from AuthContext
  const [profile, setProfile] = useState({ name: "", email: "", location: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://your-api-server.com/user/${id}/profile`, // Corrected URL
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data); // Assuming the response contains user profile data
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await axios.put(
        `https://your-api-server.com/api/user/${id}/profile`,
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Profile updated successfully!");
      setProfile(response.data); // Update the profile state with the new data

      // Clear success message after a short time
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {loading && <p>Loading...</p>}
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

      {/* Display user information */}
      <div className="user-info">
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>
          Profile Picture:
          <img
            src={user.profilePicture || "default-profile-pic.png"}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </p>
      </div>

      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            required
            disabled // Disable email edit for security
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
            placeholder="Share your location"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
