// src/auth.js

const TOKEN_KEY = "adminAuthToken";

export const login = (username, password) => {
  // Simple hardcoded admin credentials
  const adminUsername = "admin";
  const adminPassword = "password123";

  if (username === adminUsername && password === adminPassword) {
    localStorage.setItem(TOKEN_KEY, "authenticated");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) === "authenticated";
};
