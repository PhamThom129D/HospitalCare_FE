export const redirectByRole = (roles, navigate) => {
  if (roles.includes("ROLE_ADMIN")) return navigate("/dashboard");
  if (roles.includes("ROLE_DOCTOR")) return navigate("/dashboard");
  if (roles.includes("ROLE_USER")) return navigate("/dashboard");
  return navigate("/");
};
