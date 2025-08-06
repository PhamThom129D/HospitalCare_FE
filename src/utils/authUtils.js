// src/utils/authUtils.js
export const redirectByRole = (roles, navigate) => {
  const role = roles?.[0];

  switch (role) {
    case "ROLE_ADMIN":
      navigate("/admin/dashboard");
      break;
    case "ROLE_DOCTOR":
      navigate("/doctor/dashboard");
      break;
    case "ROLE_RECEPTIONIST":
      navigate("/reception/dashboard");
      break;
    case "ROLE_PATIENT":
      navigate("/patient/home");
      break;
    default:
      navigate("/dashboard");
  }
};
