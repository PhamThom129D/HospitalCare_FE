import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:8080/api/products',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 5000,
 
});

// Thêm token vào mỗi request nếu có
API.interceptors.request.use(
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


export const addProduct = (formData) =>
  API.post(`/add-product`, formData);

export const updateProduct = (id, formData) =>
  API.put(`/update-product/${id}`, formData);

export const getListProducts = () => API.get('/list-product');

export const deleteProduct = (id) =>
  API.delete(`/delete-product/${id}`);
