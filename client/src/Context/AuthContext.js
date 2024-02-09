import React, { createContext, useContext, useState, useEffect } from "react";
import { logInfo } from "../../../server/src/util/logging";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Attempt to retrieve the session from the session cookies when the component mounts
    const sessionFromCookie = getCookie("session");
    const sessionSigFromCookie = getCookie("session.sig");
    if (sessionFromCookie && sessionSigFromCookie) {
      setSession({
        session: sessionFromCookie,
        sessionSig: sessionSigFromCookie,
      });
      logInfo(`Session received from session cookies: ${sessionFromCookie}`);
      logInfo(
        `Session signature received from session cookies: ${sessionSigFromCookie}`
      );
    }
  }, []);

  const login = (newSession) => {
    setSession(newSession);
    logInfo("Session updated:", newSession);
  };

  const logout = () => {
    setSession(null);
    deleteCookie("session");
    deleteCookie("session.sig");
    logInfo("Session cleared");
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
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

// Function to retrieve a cookie by name
const getCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
};

// Function to delete a cookie by name
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
