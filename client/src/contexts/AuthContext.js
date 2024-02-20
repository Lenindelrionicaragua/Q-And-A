import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { logInfo } from "../../../server/src/util/logging";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //I initial based on function and this function called only on initial render.
  //because if we update UserState using UseEffect it will be updated after the initial render.
  //otherwise the user will stay (null) after every time we reload the page.

  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // When the component mounts, try to load the user from localStorage
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // Function to handle user login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage upon login
    logInfo("Login successful in AuthContext: " + JSON.stringify(userData));
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove from localStorage upon logout
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
