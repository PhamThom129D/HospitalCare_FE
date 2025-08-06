// src/components/auth/RegisterForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Grid,
  Box,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import AvatarUpload from "../common/AvtUploader";
import Button from "../common/Button";
import ErrorText from "../common/ErrorText";
import FormWrapper from "../common/FormWrapper";

import {
  emailRule,
  passwordRule,
  confirmPasswordRule,
  nameRule,
  phoneRule,
} from "../../utils/validators";
import { notifyWarning } from "../../utils/notify";

function RegisterForm({ onSubmit }) {
const {
  register,
  handleSubmit,
  watch,
  setError,
  formState: { errors },
} = useForm();


  const password = watch("password");

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

const handleFinalSubmit = async (data) => {
  if (!data.email && !data.phone) {
    setError("email", {
      type: "manual",
      message: "Vui lòng nhập email hoặc số điện thoại.",
    });
    setError("phone", {
      type: "manual",
      message: "Vui lòng nhập email hoặc số điện thoại.",
    });
    return;
  }

  const formattedData = {
    fullname: data.fullName,
    phonenumber: data.phone,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    gender: data.gender,
    role: data.role,
    avatarFile: avatarFile,
  };

  try {
    await onSubmit(formattedData);
  } catch (err) {
    const errorMessage = err?.response?.data || "Đăng ký thất bại";

    if (errorMessage.includes("Email đã tồn tại")) {
      setError("email", { type: "manual", message: errorMessage });
    } else if (errorMessage.includes("Số điện thoại đã tồn tại")) {
      setError("phone", { type: "manual", message: errorMessage });
    } else if (errorMessage.includes("không được để trống")) {
      notifyWarning(errorMessage);
    } else {
      notifyWarning(errorMessage);
    }
  }
};




  return (
    <FormWrapper title="Đăng ký tài khoản">
      <Box  mx="auto">
        <form onSubmit={handleSubmit(handleFinalSubmit)}>
          {/* Avatar Upload */}
          <AvatarUpload preview={avatarPreview} onChange={handleAvatarChange} />

            {/* Email + Họ tên */}
              <InputField
                label="Email"
                fullWidth
                {...register("email", emailRule)}
              />
              {errors.email && <ErrorText message={errors.email.message} />}

              <InputField
                label="Họ và tên"
                fullWidth
                {...register("fullName", nameRule)}
              />
              {errors.fullName && <ErrorText message={errors.fullName.message} />}

              <InputField
                label="Mật khẩu"
                type="password"
                fullWidth
                {...register("password", passwordRule)}
              />
              {errors.password && <ErrorText message={errors.password.message} />}

              <InputField
                label="Số điện thoại"
                fullWidth
                {...register("phone", phoneRule)}
              />
              {errors.phone && <ErrorText message={errors.phone.message} />}

              <InputField
                label="Xác nhận mật khẩu"
                type="password"
                fullWidth
                {...register("confirmPassword", {
                  ...confirmPasswordRule,
                  validate: (value) =>
                    value === password || "Mật khẩu xác nhận không khớp",
                })}
              />
              {errors.confirmPassword && (
                <ErrorText message={errors.confirmPassword.message} />
              )}
         

          <Grid container spacing={5} justifyContent={"center"} mt={3}>
            {/* Vai trò + Giới tính */}
            <Grid item xs={12} md={6}>
              <SelectField
                label="Vai trò"
                name="role"
                register={register}
                error={errors.role}
                validation={{ required: "Vui lòng chọn vai trò" }} 
                options={[
                  { value: "ROLE_DOCTOR", label: "Bác sĩ" },
                  { value: "ROLE_RECEPTIONIST", label: "Nhân viên tiếp nhận" },
                  { value: "ROLE_PATIENT", label: "Bệnh nhân" },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SelectField
                label="Giới tính"
                name="gender"
                register={register}
                error={errors.gender}
                validation={{ required: "Vui lòng chọn vai trò" }} 
                options={[
                  { value: "male", label: "Nam" },
                  { value: "female", label: "Nữ" },
                  { value: "other", label: "Khác" },
                ]}
              />
            </Grid>
          </Grid>

          {/* Nút đăng ký */}
          <Box mt={3}>
            <Button type="submit" fullWidth>
              Đăng ký
            </Button>
          </Box>

          {/* Chuyển sang login */}
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Đã có tài khoản?{" "}
              <MuiLink component={Link} to="/login" underline="hover">
                Đăng nhập ngay
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Box>
    </FormWrapper>
  );
}

export default RegisterForm;
