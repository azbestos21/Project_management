import React from "react";
import { Outlet, Navigate } from "react-router-dom";
export const PrivateRouter = () => {
  const token = localStorage.getItem("admintoken");
  return token ? <Outlet /> : <Navigate to="/Alogin" replace />;
};
