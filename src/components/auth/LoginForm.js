// src/components/auth/LoginForm.js
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Button from "../common/Button";
import ErrorText from "../common/ErrorText";
import FormWrapper from "../common/FormWrapper";

import { Box, Typography, Link as MuiLink, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <FormWrapper title="Đăng nhập">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Email hoặc Số điện thoại"
          {...register("username", { required: "Không được để trống" })}
        />
        {errors.username && <ErrorText message={errors.username.message} />}

        <InputField
          label="Mật khẩu"
          type="password"
          {...register("password", { required: "Không được để trống" })}
        />
        {errors.password && <ErrorText message={errors.password.message} />}

        {/* Quên mật khẩu */}
        <Box textAlign="right" mb={2}>
          <MuiLink component={Link} to="/forgot-password" underline="hover" fontSize={20}>
            Quên mật khẩu?
          </MuiLink>
        </Box>

        {/* Nút đăng nhập */}
        <Button type="submit">Đăng nhập</Button>

        {/* Ngăn cách */}
        <Divider sx={{ my: 2 }}>Hoặc</Divider>

        {/* Đăng nhập bằng Google */}
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

        {/* Chuyển sang đăng ký */}
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
