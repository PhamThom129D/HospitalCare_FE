// src/components/auth/VerifyOTPForm.js
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  Link as MuiLink,
  TextField,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import ErrorText from "../common/ErrorText";
import FormWrapper from "../common/FormWrapper";
function VerifyOTPForm({ onSubmit, onResendOTP, setStep, email }) {

  const [timeLeft, setTimeLeft] = useState(180);
  const {
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const inputRefs = useRef([]);

  // Countdown
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value) {
      setValue(`otp${index}`, value);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      setValue(`otp${index}`, "");
    }
    trigger(`otp${index}`);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !getValues(`otp${index}`) && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const internalSubmit = () => {
    let otp = "";
    for (let i = 0; i < 6; i++) {
      const val = getValues(`otp${i}`) || "";
      otp += val;
    }

    if (otp.length === 6) {
      onSubmit({ otp });
    } else {
      trigger();
    }
  };

  return (
    <FormWrapper title="Xác thực OTP">
      <form onSubmit={handleSubmit(internalSubmit)}>
        <Typography mb={2}>
          Nhập mã OTP gồm 6 chữ số đã được gửi đến email của bạn. Mã có hiệu lực trong 3 phút.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          {[...Array(6)].map((_, i) => (
            <TextField
              key={i}
              inputRef={(el) => (inputRefs.current[i] = el)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", fontSize: "1.5rem", width: "3rem" },
              }}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              error={!!errors[`otp${i}`]}
              {...{
                name: `otp${i}`,
                onBlur: () => trigger(`otp${i}`),
              }}
            />
          ))}
        </Stack>

        {Object.keys(errors).length > 0 && (
          <ErrorText message="Mã OTP phải gồm đúng 6 chữ số" />
        )}

        <Button type="submit">Xác nhận</Button>

        <Box mt={2} textAlign="center">
          {timeLeft > 0 ? (
            <Typography variant="body2" color="textSecondary">
              Gửi lại mã sau: {formatTime(timeLeft)}
            </Typography>
          ) : (
            <MuiLink
              component="button"
              variant="body2"
              onClick={() => {
                setTimeLeft(180);
                onResendOTP?.();
              }}
            >
              Gửi lại mã
            </MuiLink>
          )}
        </Box>
        <Box mt={1} textAlign="center">
  <MuiLink
    component="button"
    variant="body2"
    onClick={() => setStep?.(1)}
  >
    Nhập lại email
  </MuiLink>
</Box>


        <Box mt={2} textAlign="center">
          <MuiLink component={Link} to="/login" underline="hover">
            Quay lại đăng nhập
          </MuiLink>
        </Box>
      </form>
    </FormWrapper>
  );
}

export default VerifyOTPForm;
