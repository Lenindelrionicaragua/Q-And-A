import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { logInfo } from "../../../server/src/util/logging";
import useFetch from "../hooks/useFetch";

const AuthContext = createContext();

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // Define onLogoutSuccess function before referencing it
  const onLogoutSuccess = () => {
    // Clear the authentication context and localStorage upon receiving a successful response
    setUser(null);
    localStorage.removeItem("user");
    logInfo("Logout successful in AuthContext");
  };

  const { performFetch } = useFetch("/auth/log-out", onLogoutSuccess);

  // State to manage the user's authentication status
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    logInfo("Login successful in AuthContext: " + JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");

    performFetch({ method: "POST", url: "/auth/log-out" });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
