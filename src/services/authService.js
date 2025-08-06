import api from '../api/api';

export const login = (data) => {
  return api.post('/auth/login', data);
};

export const loginWithGoogle = (data) => {
  return api.post('/auth/login-google', data);
};


export const loginWithOtp = (data) => {
  console.log("Gọi API /auth/login-otp với:", data);
  return api.post('/auth/login-otp', data);
};


export const verifyOtp = (data) => {
  return api.post('/auth/verify-otp', data);
};

export const resendOtp = (data) => {
  return api.post('/auth/resend-otp', data);
};

// src/services/authService.js
export const register = (data) => {
  const formData = new FormData();

  formData.append("fullname", data.fullname);
  formData.append("phonenumber", data.phonenumber);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("gender", data.gender);
  formData.append("role", data.role);
  if (data.avatarFile) {
    formData.append("avatarFile", data.avatarFile);
  }

  return api.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};



