import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";

function App() {
  const handleLogin = (data) => {
    console.log("Login", data);
  };

  const handleRegister = (data) => {
    console.log("Register", data);
  };

  const handleForgotPassword = (data) => {
    console.log("Forgot password", data.email);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm onSubmit={handleLogin} />} />
        <Route path="/register" element={<RegisterForm onSubmit={handleRegister} />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm onSubmit={handleForgotPassword} />} />
      </Routes>
    </Router>
  );
}

export default App;
