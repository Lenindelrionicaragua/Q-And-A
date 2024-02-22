import "./LoginForm.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { logInfo } from "../../../../server/src/util/logging";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loginError: null,
  });

  const { email, password, loginError } = formData;
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSuccess = (response) => {
    if (response.success === true) {
      setFormData({ email: "", password: "", loginError: null });

      logInfo(
        "Response from server in login Form: " + JSON.stringify(response)
      );

      login(response.user);

      if (onLogin) {
        onLogin(response);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        loginError: response.msg || "Invalid credentials. Please try again.",
      }));
      logInfo("Login failed.");
    }
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/auth/log-in",
    handleLoginSuccess
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      body: JSON.stringify({ user: { email, password } }),
    });
  };

  let statusComponent = null;
  const errorMessage = loginError || (error && error.toString());

  if (errorMessage) {
    statusComponent = (
      <div id="log-in-status-component" style={{ color: "red" }}>
        Error: {errorMessage}
      </div>
    );
  } else if (isLoading) {
    statusComponent = <div id="log-in-status-component">Loading....</div>;
  }

  useEffect(() => {
    return () => {
      // call a cancelFetch when the component is unmounted
      cancelFetch();
    };
  }, []);

  return (
    <>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div id="login-input-area">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="username"
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </label>
        </div>
        <br />
        <button type="submit" disabled={isLoading} id="submit-login-button">
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {/* {isLoading && <p>Loading...</p>} */}
        {statusComponent}
      </form>
    </>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func,
};

LoginForm.defaultProps = {
  onLogin: null,
};

export default LoginForm;
