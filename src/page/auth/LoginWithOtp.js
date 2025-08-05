

import React from "react";
import OtpForm from "@/components/auth/OtpForm";
import AuthWrapper from "@/components/common/AuthWrapper";

const VerifyOtpPage = () => {
  return (
    <AuthWrapper title="Verify OTP">
      <OtpForm />
    </AuthWrapper>
  );
};

export default VerifyOtpPage;
