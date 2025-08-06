// src/components/auth/GoogleLoginButton.js
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { redirectByRole } from "../../utils/authUtils";
import { loginWithGoogle } from "../../services/authService";
import { notifySuccess } from "../../utils/notify";

function GoogleLoginButton() {
  const navigate = useNavigate();

const handleSuccess = async (credentialResponse) => {
  const idToken = credentialResponse.credential;

  try {
    const response = await loginWithGoogle({ token: idToken });
    const { token, role } = response.data;

    localStorage.setItem("token", token);
    redirectByRole(role, navigate);
    notifySuccess("Đăng nhập thành công với Google!");
  } catch (error) {
    console.error("Login with Google failed", error);
  }
};
  const handleError = () => {
    console.error("Google login failed");
  };

  return (
   <GoogleLogin
  onSuccess={handleSuccess}
  onError={handleError}
  size="large"
  text="signin_with"
/>

  );
}

export default GoogleLoginButton;
