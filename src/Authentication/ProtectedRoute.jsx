// src/Authentication/ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAuthenticated = searchParams.get("auth") === "1";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
