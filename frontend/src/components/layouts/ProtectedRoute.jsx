import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../features/UI/Spinner";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, loading } = useAuth(); // Assuming useAuth exposes a loading state
  const location = useLocation();

  // 1. Show spinner while Firebase is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // 2. Check if user is logged in (Firebase Auth)
  if (!currentUser) {
    return <Navigate to="/citizenlogin" state={{ from: location }} replace />;
  }

  // 3. Role-Based Access Control (RBAC)
  if (requiredRole) {
    // Retrieve the user details stored during login (StaffLogin.jsx sets this)
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if we have stored user data and if the role matches
    // We allow 'admin' access to both 'admin' and 'staff' roles for simplicity here,
    // or strictly match the required role.
    const userRole = storedUser?.role;

    if (
      requiredRole === "admin" &&
      userRole !== "admin" &&
      userRole !== "staff"
    ) {
      // User is logged in but doesn't have permission
      return <Navigate to="/dashboard" replace />;
    }

    if (requiredRole === "citizen" && userRole !== "citizen") {
      // Optional: Redirect staff trying to access citizen pages
      // return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
