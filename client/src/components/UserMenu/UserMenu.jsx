import React from "react";
import { useAuth } from "../../Context/AuthContext";
import "./UserMenu.css";

const UserMenu = () => {
  const { user } = useAuth();

  return (
    <div className="user-menu">
      <button className="primary-button">
        {user && (
          <>
            <p>
              <span className="capitalize">{user.name}</span>
            </p>
          </>
        )}
      </button>
    </div>
  );
};

export default UserMenu;
