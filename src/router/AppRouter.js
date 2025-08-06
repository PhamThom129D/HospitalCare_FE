// src/router/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPasswordPage from "../page/auth/ForgotPasswordPage";
import LoginPage from "../page/auth/LoginPage";
import RegisterPage from "../page/auth/RegisterPage";
import { Home } from "@mui/icons-material"; // Hoặc thay bằng 1 page thực tế nếu có

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
