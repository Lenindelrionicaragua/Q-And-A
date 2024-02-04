import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { logError, logInfo } from "../../../../server/src/util/logging";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Perform your login logic here
      // For example, make an API request or any other authentication mechanism

      // For demonstration purposes, let's assume login is successful
      const response = { success: true };

      if (response.success) {
        navigate("/");
        logInfo("Login successful!");
        return true;
      } else {
        logError("Login failed.");
        return false;
      }
    } catch (error) {
      logError(error);
      return false;
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;
