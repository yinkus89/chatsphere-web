import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/axiosConfig"; // Import axiosInstance
import "../styles/styles.css";

const Profile = () => {
  const { id } = useParams(); // ID of the user profile to fetch
  const { user, token } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "", // Assuming location is available in user
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!token) return; // Only fetch if token is available
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `user/${id}/profile`, // Using ID
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token, id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `user/${id}/profile`, // Using ID
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Profile updated successfully!");
      setProfile(response.data);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error(err.response ? err.response.data : err);
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

      <div className="user-info">
        <h2>Welcome, {user?.name}</h2>
        <p>Email: {user?.email}</p>
        <p>
          Profile Picture:
          <img
            src={user?.profilePicture || "default-profile-pic.png"}
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
