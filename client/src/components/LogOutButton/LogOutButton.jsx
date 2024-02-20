import React from "react";
import "./LogOutButton.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LogOutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Link to="/" onClick={handleLogout}>
      <button className="btn">Log Out</button>
    </Link>
  );
};

export default LogOutButton;
