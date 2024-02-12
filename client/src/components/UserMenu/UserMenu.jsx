import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import "./UserMenu.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import LogOut from "../LogOut/LogOut";

const UserMenu = () => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="user-menu">
      {user && (
        <div
          className="user-menu-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <PrimaryButton
            text={user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          />
          {isHovered && (
            <div className="dropdown-content">
              <LogOut />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
