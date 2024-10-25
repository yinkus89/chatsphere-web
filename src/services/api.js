import axiosInstance from "./axiosConfig"; // Import your axios instance

const API_URL = "https://virtserver.swaggerhub.com/YINKAWLB/chatterbox1/1.0.0"; // Define your API URL

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
    throw error;
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
    throw error;
  }
};

// Get Profile
export const getProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Send Message
export const sendMessage = async (to, message) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/messages`, {
      to,
      message,
    });
    return response.data; // Assuming the response data contains the message
  } catch (error) {
    throw error;
  }
};

// Fetch Messages
export const fetchMessages = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/messages/${userId}`); // Adjust endpoint as necessary
    return response.data; // Ensure this returns the expected message structure
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
  }
};
