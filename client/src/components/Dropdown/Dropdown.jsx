import React, { useState } from "react";
import { MenuItems } from "../MenuItems/MenuItems";
import "./Dropdown.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Dropdown() {
  const { user } = useAuth();

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          if (item.title === "Login" && user) {
            return null;
          }
          if (item.title === "User Profile" && !user) {
            return null;
          }
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
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
