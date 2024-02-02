import React from "react";
import useFetch from "../../hooks/useFetch";
import Login from "../../components/Login/Login";
import { logError, logInfo } from "../../../../server/src/util/logging";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { performFetch } = useFetch("/user/login", handleLogin);

  async function handleLogin(formData) {
    try {
      const response = await performFetch({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response && response.success) {
        const { token } = response;
        localStorage.setItem("token", token);
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
  }

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;
