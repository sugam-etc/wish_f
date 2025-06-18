import axios from "axios";
import { BACKEND_URL } from "../config/backend";

// API functions
const API_BASE = `${BACKEND_URL}/api/adventures`;

export const getAdventures = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching adventures:", error);
    return [];
  }
};

export const getAdventureById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data || null;
  } catch (error) {
    console.error("Error fetching adventure:", error);
    return null;
  }
};

export const createAdventure = async (formData) => {
  try {
    const response = await axios.post(API_BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data || null;
  } catch (error) {
    console.error("Error creating adventure:", error);
    throw error;
  }
};

export const updateAdventure = async (id, formData) => {
  try {
    const response = await axios.put(`${API_BASE}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data || null;
  } catch (error) {
    console.error("Error updating adventure:", error);
    throw error;
  }
};

export const deleteAdventure = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting adventure:", error);
    throw error;
  }
};
