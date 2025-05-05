import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtecteRoute = () => {
  const isLoggenIn = window.localStorage.getItem("loggedInUser") || null;
  console.log("isLoggenIn", isLoggenIn);
  return isLoggenIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtecteRoute;
