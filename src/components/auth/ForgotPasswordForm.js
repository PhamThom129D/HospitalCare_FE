// src/components/auth/ForgotPasswordForm.js
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Button from "../common/Button";
import ErrorText from "../common/ErrorText";
import FormWrapper from "../common/FormWrapper";
import { Typography, Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

function ForgotPasswordForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <FormWrapper title="Quên mật khẩu">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography mb={2}>
          Nhập địa chỉ email để nhận mã xác thực tài khoản. Mã này sẽ giúp bạn đăng nhập lại tài khoản của mình.
        </Typography>

        <InputField
          label="Email"
          type="email"
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ",
            },
          })}
        />
        {errors.email && <ErrorText message={errors.email.message} />}

        <Button type="submit">Nhận mã xác thực tài khoản</Button>

        <Box mt={2} textAlign="center">
          <MuiLink component={Link} to="/login" underline="hover">
            Quay lại đăng nhập
          </MuiLink>
        </Box>
      </form>
    </FormWrapper>
  );
}

export default ForgotPasswordForm;
