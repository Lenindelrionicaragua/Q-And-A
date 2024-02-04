// LoginPage.jsx
import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { logError, logInfo } from "../../../../server/src/util/logging";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (response) => {
    try {
      if (response.success) {
        navigate("/");
        logInfo("Login successful!");
      } else {
        logError("Login failed.");
      }
    } catch (error) {
      logError(error);
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;
