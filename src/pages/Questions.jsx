import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AuthContext from "../context/AuthContext";

const Questions = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default Questions;
