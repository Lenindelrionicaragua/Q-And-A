import "./LoginPage.css";
import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <div id="logInPage">
      <h1>Welcome back!</h1>
      <LoginForm onLogin={handleLogin} />
      <hr></hr>
      <h2>
        New user? Sign up <Link to="/auth/sign-up">here</Link>!
      </h2>
    </div>
  );
};

export default LoginPage;
