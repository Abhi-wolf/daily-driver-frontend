/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();

  if (!user?.email) {
    return <Navigate to="/main" replace />;
  }

  // Render the protected route if authenticated
  return children;
};

export default ProtectedRoute;
