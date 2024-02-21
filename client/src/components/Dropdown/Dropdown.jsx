import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "../MenuItems/MenuItems";
import "./Dropdown.css";
import { useAuth } from "../../contexts/AuthContext";

function Dropdown() {
  const { logout } = useAuth();

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    setClick(false);
    logout();
  };

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={
                  item.logOut ? () => handleLogout() : () => setClick(false)
                }
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
