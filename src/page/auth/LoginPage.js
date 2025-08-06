// src/pages/LoginPage.js
import React from "react";
import LoginForm from "../../components/auth/LoginForm";

function LoginPage() {
  const handleLogin = (data) => {
    console.log("Login data", data);
    // Gửi API tại đây...
  };

  return <LoginForm onSubmit={handleLogin} />;
}

export default LoginPage;
