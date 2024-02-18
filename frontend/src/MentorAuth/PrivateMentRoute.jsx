import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateMentRoute = () => {
  const token = localStorage.getItem("Mentortoken");
  return token ? <Outlet /> : <Navigate to="/Mlogin" replace />;
};
