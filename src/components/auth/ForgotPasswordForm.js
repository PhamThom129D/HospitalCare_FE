import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Button from "../common/Button";
import ErrorText from "../common/ErrorText";
import FormWrapper from "../common/FormWrapper";
import { Typography, Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { emailRule } from "../../utils/validators";

function ForgotPasswordForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSending, setIsSending] = useState(false);

  const handleFormSubmit = async (data) => {
    if (isSending) return;

    setIsSending(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Lỗi gửi OTP:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <FormWrapper title="Quên mật khẩu">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography mb={2}>
          Nhập địa chỉ email để nhận mã xác thực tài khoản. Mã này sẽ giúp bạn đăng nhập lại tài khoản của mình.
        </Typography>

        <InputField
          label="Email"
          type="email"
          {...register("email", emailRule)}
        />
        {errors.email && <ErrorText message={errors.email.message} />}

        <Button type="submit" disabled={isSending}>
          {isSending ? "Đang gửi..." : "Nhận mã xác thực tài khoản"}
        </Button>

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
