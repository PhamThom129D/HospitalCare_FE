// src/components/auth/LoginForm.js
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Button from "../common/Button";
import ErrorText from "../common/ErrorText";
import FormWrapper from "../common/FormWrapper";

import {
  Box,
  Typography,
  Link as MuiLink,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { redirectByRole } from "../../utils/authUtils";
import { notifyError } from "../../utils/notify";
import { required } from "../../utils/validators";

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await login({
        emailOrPhone: data.emailOrPhone,
        password: data.password,
      });

      const { token, fullname, email, phonenumber, avatarUrl, roles } = response.data;

      const storage = data.rememberMe ? localStorage : sessionStorage;

      storage.setItem("token", token);
      storage.setItem(
        "account",
        JSON.stringify({ fullname, email, phonenumber, avatarUrl, roles })
      );

      redirectByRole(roles, navigate);
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
      notifyError("Sai tài khoản hoặc mật khẩu.");
    }
  };

  return (
    <FormWrapper title="Đăng nhập">
      <form onSubmit={handleSubmit(handleLogin)}>
        <InputField
          label="Email hoặc Số điện thoại"
          {...register("emailOrPhone",required)}
        />
        {errors.emailOrPhone && <ErrorText message={errors.emailOrPhone.message} />}

        <InputField
          label="Mật khẩu"
          type="password"
          {...register("password",required)}
        />
        {errors.password && <ErrorText message={errors.password.message} />}

        <FormControlLabel
          control={<Checkbox {...register("rememberMe")} />}
          label="Nhớ tài khoản"
          sx={{ mb: 2 }}
        />

        <Box textAlign="right" mb={2}>
          <MuiLink component={Link} to="/forgot-password" underline="hover" fontSize={20}>
            Quên mật khẩu?
          </MuiLink>
        </Box>

        <Button type="submit">Đăng nhập</Button>

        <Divider sx={{ my: 2 }}>Hoặc</Divider>

        <Button
          type="button"
          onClick={() => console.log("Google Login")}
          startIcon={<GoogleIcon />}
          sx={{
            backgroundColor: "#DB4437",
            "&:hover": { backgroundColor: "#c23321" },
          }}
        >
          Đăng nhập bằng Google
        </Button>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Chưa có tài khoản?{" "}
            <MuiLink component={Link} to="/register" underline="hover">
              Đăng ký ngay
            </MuiLink>
          </Typography>
        </Box>
      </form>
    </FormWrapper>
  );
}

export default LoginForm;
