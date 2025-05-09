// src/Auth.js

export const adminUsername = "admin";
export const adminPassword = "password123";

export const validateCredentials = (username, password) => {
  return username === adminUsername && password === adminPassword;
};
