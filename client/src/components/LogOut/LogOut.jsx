import React from "react";
import { useAuth } from "../../Context/AuthContext";
import PrimaryButton from "../Buttons/PrimaryButton";

const LogOut = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="logOut">
      <PrimaryButton text="LogOut" onClickHandler={handleLogout} />
    </div>
  );
};

export default LogOut;
