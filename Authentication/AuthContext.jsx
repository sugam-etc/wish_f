import { createContext, useContext, useState, useEffect } from "react";
import { adminLogin } from "../src/api/authService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing auth data in localStorage
    const storedAuth = localStorage.getItem("authData");
    if (storedAuth) {
      const { isAuthenticated, user, token } = JSON.parse(storedAuth);
      setIsAuthenticated(isAuthenticated);
      setUser(user);
      setToken(token);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await adminLogin(username, password);

      // Store authentication data
      const authData = {
        isAuthenticated: true,
        user: {
          _id: response._id,
          username: response.username,
          role: response.role,
        },
        token: response.token,
      };

      localStorage.setItem("authData", JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser(authData.user);
      setToken(authData.token);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
