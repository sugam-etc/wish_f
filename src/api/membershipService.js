import axios from "axios";
import { BACKEND_URL } from "../config/backend";

const API_MEMBERSHIPS = `${BACKEND_URL}/api/membership`;

// Purchase membership
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

// Cancel membership (user only)
const cancelMembership = async (membershipId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_MEMBERSHIPS}/${membershipId}/cancel`,
    {},
    config
  );
  console.log("Cancelling membership for ID:", membershipId);
  console.log("Cancelling membership for ID: length", membershipId.length);

  return response.data;
};
// Delete membership (admin only)
// Delete membership (admin only)
const deleteMembership = async (membershipId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${API_MEMBERSHIPS}/${membershipId}`,
    config
  );
  return response.data;
};

// Get all memberships (admin)
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

// Get pending memberships (admin)
const getPendingMemberships = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_MEMBERSHIPS}/pending`, config);
  return response.data;
};

// Get active memberships (admin)
const getActiveMemberships = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_MEMBERSHIPS}/active`, config);
  return response.data;
};

const membershipService = {
  purchaseMembership,
  verifyMembership,
  rejectMembership,
  cancelMembership,
  getAllMemberships,
  deleteMembership,
  getPendingMemberships,
  getActiveMemberships,
};

export default membershipService;
