import { BACKEND_URL } from "../config/backend.js";
const API_BASE_URL = `${BACKEND_URL}/api/infos`; // Replace with your actual API URL

export const createInfo = async (title) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  return response.json();
};

export const getAllInfos = async () => {
  const response = await fetch(API_BASE_URL);
  return response.json();
};

export const getInfo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return response.json();
};

export const updateInfo = async (id, title) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  return response.json();
};

export const deleteInfo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
// api/infoService.js
export const getLatestInfo = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/infos/get/latest`);

    if (!response.ok) {
      throw new Error("Failed to fetch latest info");
    }

    const result = await response.json();

    // Handle case where no info exists
    if (!result || (!result.data && !result.title)) {
      return null;
    }

    // Return either the direct data or the nested data
    return result.data || result;
  } catch (error) {
    console.error("Error fetching latest info:", error);
    throw error;
  }
};
