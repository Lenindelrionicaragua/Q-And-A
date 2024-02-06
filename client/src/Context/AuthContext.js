import React, { createContext, useContext, useState } from "react";
import { logInfo } from "../../../server/src/util/logging";
import PropTypes from "prop-types";

const AuthContext = createContext();

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/; secure; SameSite=strict`;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getCookie("token") || null);

  const login = (newToken) => {
    setToken(newToken);
    setCookie("token", newToken, 1); // Sets the cookie with a duration of 1 day

    logInfo(`Token set in context: ${newToken}`);
  };

  const logout = () => {
    setToken(null);
    deleteCookie("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
