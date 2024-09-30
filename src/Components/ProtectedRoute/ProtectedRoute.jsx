import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let token = localStorage.getItem("token");
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
  } catch (error) {
    console.log(error);
    localStorage.clear();
    return <Navigate to={"/signin"} />;
  }
  if (token) return children;
  return <Navigate to={"/signin"} />;
}
