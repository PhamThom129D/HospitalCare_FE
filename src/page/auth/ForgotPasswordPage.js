// src/pages/auth/ForgotPasswordPage.js
import React, { useState } from "react";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import VerifyOTPForm from "../../components/auth/VerifyOTPForm";
import { loginWithOtp, verifyOtp, resendOtp } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { redirectByRole } from "../../utils/authUtils";
import { handleApiError, notifyError, notifyInfo, notifySuccess, notifyWarning } from "../../utils/notify";

function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

const handleEmailSubmit = async ({ email }) => {
  notifyInfo("Đang gửi mã OTP tới email của bạn...");
  try {
    const res = await loginWithOtp({ emailOrPhone: email });
    console.log("Phản hồi từ API:", res.data);

    setEmail(email);
    setStep(2);
    notifySuccess("Mã OTP đã được gửi thành công. Vui lòng kiểm tra hộp thư.");
  } catch (err) {
    console.error("Lỗi gửi OTP:", err);

    const rawMessage = err?.response?.data;
    const errorMsg = typeof rawMessage === "string" ? rawMessage.toLowerCase() : "";

    if (errorMsg.includes("account not found")) {
      notifyError("Email bạn nhập không có trong hệ thống.");
    } else {
      notifyError("Gửi OTP thất bại. Vui lòng thử lại.");
    }
  }
};

  const handleOTPSubmit = async ({ otp }) => {
    try {
      const res = await verifyOtp({ emailOrPhone: email, otpCode: otp });
      const user = res.data;
      notifySuccess("Xác minh OTP thành công");
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("account", JSON.stringify({
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
        avatarUrl: user.avatarUrl,
        roles: user.roles,
      }));

      const role = user.roles?.[0];
      if (!role) return notifyWarning("Không xác định được vai trò người dùng.");

      redirectByRole(role, navigate);
    } catch (err) {
        handleApiError(err, "Xác thực OTP thất bại.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const res = await resendOtp({ emailOrPhone: email });
      console.log("Resend OTP response:", res.data);
      notifySuccess("Mã OTP đã được gửi lại.");
    } catch (err) {
      handleApiError(err, "Gửi lại mã OTP thất bại.");
    }
  };

  return step === 1 ? (
    <ForgotPasswordForm onSubmit={handleEmailSubmit} />
  ) : (
    <VerifyOTPForm
      onSubmit={handleOTPSubmit}
      onResendOTP={handleResendOTP}
      setStep={setStep}
      email={email}
    />
  );
}

export default ForgotPasswordPage;
