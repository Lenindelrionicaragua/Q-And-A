// LoginForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { logInfo } from "../../../../server/src/util/logging";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../Context/AuthContext";

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
    logInfo(`${name} input value changed to: ${value}`);
  };

  const handleLoginSuccess = (response) => {
    if (response.success === true) {
      setFormData({ email: "", password: "", loginError: null });
      logInfo("Login successful");

      login(response.token);

      if (onLogin) {
        onLogin(response);
      }
    } else {
      handleLoginError(response);
    }
  };

  const handleLoginError = (response) => {
    setFormData((prevData) => ({
      ...prevData,
      loginError: response.msg || "Invalid credentials. Please try again.",
    }));
    logInfo("Login failed.");
  };

  const { isLoading, performFetch } = useFetch(
    "/user/login",
    handleLoginSuccess,
    handleLoginError
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    });
  };

  useEffect(() => {
    return () => {
      // Limpieza necesaria, como cancelar solicitudes, si es necesario
    };
  }, []);

  return (
    <div>
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      <form onSubmit={handleSubmit}>
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
          />
        </label>
        <br />
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
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {isLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func,
};

LoginForm.defaultProps = {
  onLogin: null,
};

export default LoginForm;
