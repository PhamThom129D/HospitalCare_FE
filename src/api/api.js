// service/api.js
import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Token gửi đi:', token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("⛔ Unauthorized - cần đăng nhập lại");
    } else if (status === 403) {
      console.warn("⛔ Forbidden - không có quyền truy cập");
    } else {
      console.error(`🚨 Lỗi API [${status}]:`, error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
