import React from 'react';

const OtpInput = ({ length = 6, otp, setOtp }) => {
  const handleChange = (e, i) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = otp.split("");
    newOtp[i] = value;
    setOtp(newOtp.join(""));
    if (value && i < length - 1) {
      document.getElementById(`otp-${i + 1}`).focus();
    }
  };

  return (
    <div className="flex gap-2">
      {[...Array(length)].map((_, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          maxLength={1}
          className="w-10 h-10 text-center border rounded"
          value={otp[i] || ""}
          onChange={(e) => handleChange(e, i)}
        />
      ))}
    </div>
  );
};

export default OtpInput;