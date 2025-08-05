// src/pages/RegisterPage.js
import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";

function RegisterPage() {
  const handleRegister = (data) => {
    console.log("Register data", data);
    // Gửi API đăng ký tại đây...
  };

  return <RegisterForm onSubmit={handleRegister} />;
}

export default RegisterPage;
