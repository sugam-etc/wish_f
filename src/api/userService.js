import axios from "axios";
import { BACKEND_URL } from "../config/backend";

export const API_BASE = BACKEND_URL + "/api/users";
const API_MEMBERSHIPS = BACKEND_URL + "/api/membership";
// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_BASE}/register`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Register admin (for production)
const registerAdmin = async (adminData) => {
  const response = await axios.post(`${API_BASE}/registeradmin`, adminData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_BASE}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login admin
const loginAdmin = async (adminData) => {
  const response = await axios.post(`${API_BASE}/loginadmin`, adminData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Get user profile
const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_BASE}/profile`, config);
  return response.data;
};

// Update user profile
const updateProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_BASE}/profile`, userData, config);
  return response.data;
};

// Upload profile image
const uploadProfileImage = async (file, token) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_BASE}/profile/image`,
    formData,
    config
  );
  return response.data;
};

const purchaseMembership = async (membershipData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(API_MEMBERSHIPS, membershipData, config);
  return response.data;
};

// Verify membership (admin only)
const verifyMembership = async (membershipId, verificationNotes, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_MEMBERSHIPS}/${membershipId}/verify`,
    { verificationNotes },
    config
  );
  return response.data;
};

// Reject membership (admin only)
const rejectMembership = async (membershipId, verificationNotes, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_MEMBERSHIPS}/${membershipId}/reject`,
    { verificationNotes },
    config
  );
  return response.data;
};

// Get pending memberships (admin only)
const getPendingMemberships = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_MEMBERSHIPS}/pending`, config);
  return response.data;
};

// Get active memberships (admin only)
const getActiveMemberships = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_MEMBERSHIPS}/active`, config);
  return response.data;
};

// Get all memberships with filters (admin only)
const getAllMemberships = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: filters,
  };
  const response = await axios.get(API_MEMBERSHIPS, config);
  return response.data;
};

// Add reward
const addReward = async (rewardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Log the data being sent
  console.log("Sending reward data:", rewardData);

  const response = await axios.post(`${API_BASE}/rewards`, rewardData, config);
  return response.data;
};

// Update reward
const updateReward = async (rewardId, rewardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_BASE}/rewards/${rewardId}`,
    rewardData,
    config
  );
  return response.data;
};

const removeReward = async (userId, rewardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${API_BASE}/${userId}/rewards/${rewardId}`,
    config
  );
  console.log(`Attempting to remove reward ${rewardId} from user ${userId}`);
  return response.data;
};

// Get specific user
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // Use the correct endpoint with the userId in the URL
    const response = await axios.get(`${API_BASE}/${userId}`, config);

    if (!response.data) {
      throw new Error("User not found");
    }

    // Ensure rewards array exists
    if (!response.data.rewards) {
      response.data.rewards = [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
// Get all users (admin only)
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_BASE}`, config);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const userService = {
  register,
  registerAdmin,
  login,
  loginAdmin,
  logout,
  getProfile,
  updateProfile,
  uploadProfileImage,
  purchaseMembership,
  addReward,
  updateReward,
  removeReward,
  getUsers,
  getUser,
  verifyMembership,
  rejectMembership,
  getPendingMemberships,
  getActiveMemberships,
  getAllMemberships,
};

export default userService;
