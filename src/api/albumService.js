import axios from "axios";
import { BACKEND_URL } from "../config/backend";

const API_BASE = `${BACKEND_URL}/api/albums`;

export const getAlbums = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
};

export const getAlbumById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data.data || null;
  } catch (error) {
    console.error("Error fetching album:", error);
    return null;
  }
};

export const deleteAlbum = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/${id}`);
    return response.data; // Returns the success message from backend
  } catch (error) {
    console.error("Error deleting album:", error);
    throw error; // Throw error to handle in the component
  }
};

export const createAlbum = async (formData) => {
  try {
    const response = await axios.post(API_BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data || null;
  } catch (error) {
    console.error("Error creating album:", error);
    throw error;
  }
};
