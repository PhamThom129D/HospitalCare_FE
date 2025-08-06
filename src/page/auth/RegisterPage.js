// src/pages/RegisterPage.js
import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import { register as registerApi } from "../../services/authService"; 

import { useNavigate } from "react-router-dom";
import { redirectByRole } from "../../utils/authUtils"; 
import {
  notifySuccess,
  notifyWarning,
} from "../../utils/notify";

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const res = await registerApi(formData);
      const user = res.data;

      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("account", JSON.stringify({
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
        avatarUrl: user.avatarUrl,
        roles: user.roles,
      }));

      const roles = user.roles;
      if (!roles || roles.length === 0) {
        notifyWarning("Không xác định được vai trò người dùng.");
        return;
      }

      notifySuccess("Đăng ký và đăng nhập thành công!");
      redirectByRole(roles, navigate);
    } catch (err) {
      // Trả lỗi về cho RegisterForm xử lý
      throw err;
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
}


export default RegisterPage;
