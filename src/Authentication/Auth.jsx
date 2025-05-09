// src/Authentication/Auth.js

export const validateCredentials = (username, password) => {
  const adminUsername = "admin";
  const adminPassword = "password123";
  return username === adminUsername && password === adminPassword;
};
