import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";

const UserPrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useUserAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/userprofile" replace />;
  }

  return children;
};

export default UserPrivateRoute;
