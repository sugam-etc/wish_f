import axios from "axios";
import { BACKEND_URL } from "../config/backend";

const API_BASE = `${BACKEND_URL}/api/email`;

export const getEmails = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
};

export const createEmail = async (emailData) => {
  try {
    const response = await axios.post(API_BASE, emailData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(
      error.response?.data?.message || "Failed to subscribe. Please try again."
    );
  }
};
