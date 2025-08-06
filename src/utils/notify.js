import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Tuỳ chỉnh style toast chung
const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
//   toastClassName: "custom-toast", // Áp dụng class CSS custom
};

export const notifySuccess = (message) => {
  toast.success(message, toastOptions);
};

export const notifyError = (message) => {
  toast.error(message, toastOptions);
};

export const notifyInfo = (message) => {
  toast.info(message, toastOptions);
};

export const notifyWarning = (message) => {
  toast.warn(message, toastOptions);
};
export const handleApiError = (err, fallbackMessage = "Đã có lỗi xảy ra.") => {
  console.error("API Error:", err);
  const msg = err?.response?.data?.message || fallbackMessage;
  notifyError(msg);
};