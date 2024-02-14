import React from "react";
import "./LogOutButton.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const LogOutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Link to="/" onClick={handleLogout}>
      <button className="btn">LogOut</button>
    </Link>
  );
};

export default LogOutButton;
