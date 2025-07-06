import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../src/api/userService";

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(userData.token);

        // Fetch user profile only if we have a token
        if (userData.token) {
          const profile = await userService.getProfile(userData.token);

          setIsAuthenticated(true);
          setUser({
            ...profile,
            token: userData.token,
            role: userData.role || "user", // Default to 'user' if role not specified
          });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await userService.login({ email, password });
      handleAuthSuccess(response);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const response = await userService.loginAdmin({ email, password });
      if (response && response.role === "admin") {
        handleAuthSuccess(response);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Admin login error:", error);
      return false;
    }
  };

  const handleAuthSuccess = (response) => {
    const userData = {
      token: response.token,
      _id: response._id,
      fullName: response.fullName,
      email: response.email,
      role: response.role || "user", // Default to 'user' if role not specified
      profileImage: response.profileImage,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    setToken(response.token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    navigate("/userlogin");
  };

  return (
    <UserAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        loading,
        login,
        loginAdmin,
        logout,
        getProfile: () => userService.getProfile(token),
        updateProfile: (data) => userService.updateProfile(data, token),
        uploadProfileImage: (file) =>
          userService.uploadProfileImage(file, token),
        purchaseMembership: (data) =>
          userService.purchaseMembership(data, token),
      }}
    >
      {!loading && children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
