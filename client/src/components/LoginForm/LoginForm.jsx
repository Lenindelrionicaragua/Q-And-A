// LoginForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { logInfo } from "../../../../server/src/util/logging";
import useFetch from "../../hooks/useFetch";

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loginError: null,
  });

  const { email, password, loginError } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    logInfo(`${name} input value changed to: ${value}`);
  };

  const handleLoginSuccess = (response) => {
    if (response.success === true) {
      setFormData({ email: "", password: "", loginError: null });
      logInfo("Login successfull LOGIN FORM");
      if (onLogin) {
        onLogin(response);
      }
    } else {
      handleLoginError(response);
    }
  };

  const handleLoginError = (response) => {
    setFormData({
      ...formData,
      loginError: response.msg || "Invalid credentials. Please try again.",
    });
    logInfo("Login failed.");
  };

  const { isLoading, performFetch } = useFetch(
    "/user/login",
    handleLoginSuccess,
    handleLoginError
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the current formData before the API call
    logInfo("formData before API call:", formData);

    // Call performFetch with the appropriate options
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
      // Aquí no necesitas agregar nada más, ya que useFetch se encargará de la limpieza.
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
