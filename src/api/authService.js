// frontend/src/services/apiService.js

// Define the base URL for your backend API
// Ensure this matches the port your backend is running on (e.g., 5000)
import { BACKEND_URL } from "../config/backend";

const API_BASE_URL = `${BACKEND_URL}/api`;
/**
 * Handles HTTP requests and parses the response.
 * @param {Response} response - The fetch API Response object.
 * @returns {Promise<any>} - A promise that resolves with the parsed JSON data.
 * @throws {Error} - Throws an error if the response is not OK.
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    // If the response status is not in the 2xx range, it's an error.
    // Try to parse the error message from the response body.
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  // If response is OK, parse and return the JSON data.
  return response.json();
};

/**
 * Sends a POST request for admin login.
 * @param {string} username - The admin username.
 * @param {string} password - The admin password.
 * @returns {Promise<object>} - A promise that resolves with the login response data (e.g., user info and token).
 */
export const adminLogin = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
      method: "POST", // Specify POST method for login
      headers: {
        "Content-Type": "application/json", // Indicate that the request body is JSON
      },
      // Convert username and password object to a JSON string for the request body
      body: JSON.stringify({ username, password }),
    });
    // Handle the response (check for errors, parse JSON)
    return await handleResponse(response);
  } catch (error) {
    // Log and re-throw any errors that occur during the fetch operation or response handling
    console.error("Login API error:", error);
    throw error; // Re-throw to be caught by the component
  }
};
