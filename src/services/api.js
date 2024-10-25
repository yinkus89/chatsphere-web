import axios from "axios";

// Define your API URL
const API_URL = "https://virtserver.swaggerhub.com/YINKAWLB/chatterbox1/1.0.0";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Utility function for email validation
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Login User
export const loginUser = async (email, password) => {
  try {
    if (!validateEmail(email) || password.length < 6) {
      throw new Error("Invalid email format or password too short.");
    }
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(errorMsg);
  }
};

// Register User
export const registerUser = async (name, email, password) => {
  try {
    if (!validateEmail(email) || password.length < 6) {
      throw new Error("Invalid email format or password too short.");
    }
    const response = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Registration failed. Please try again.";
    throw new Error(errorMsg);
  }
};

// Get Profile
export const getProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/profile`);
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Failed to fetch profile.";
    throw new Error(errorMsg);
  }
};

// Send Message
export const sendMessage = async (to, message) => {
  try {
    const response = await axiosInstance.post("/messages", { to, message });
    return response.data; // Assuming the response data contains the message
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to send message.";
    throw new Error(errorMsg);
  }
};

// Fetch Messages
export const fetchMessages = async (userId) => {
  try {
    const response = await axiosInstance.get(`/messages/${userId}`); // Use the base URL
    return response.data; // Ensure this returns the expected message structure
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Failed to fetch messages.";
    throw new Error(errorMsg);
  }
};

// Upload Status Image
export const uploadStatus = async (formData) => {
  try {
    const response = await axiosInstance.post("/status/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Failed to upload status.";
    throw new Error(errorMsg);
  }
};

// Upload Profile Picture
export const uploadProfilePicture = async (formData) => {
  try {
    const response = await axiosInstance.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Failed to upload profile picture.";
    throw new Error(errorMsg);
  }
};

// Update User Name
export const updateUserName = async (id, newUserName) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, {
      username: newUserName,
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Failed to update username.";
    throw new Error(errorMsg);
  }
};

// Search Users by Username
export const searchUsersByUsername = async (username) => {
  try {
    const response = await axiosInstance.get("/users", {
      params: { username },
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to search users.";
    throw new Error(errorMsg);
  }
};

// Log Out User
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Add Friend
export const addFriend = async (friendId) => {
  try {
    const response = await axiosInstance.post("/friends/add", { id: friendId });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to add friend.";
    throw new Error(errorMsg);
  }
};
