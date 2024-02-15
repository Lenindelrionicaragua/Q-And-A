import React, { useState } from "react";
import { SignUpButton } from "../SignUpButton/SignUpButton";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";
import Dropdown from "../Dropdown/Dropdown";
import { useAuth } from "../../Context/AuthContext";
import LogOutButton from "../LogOutButton/LogOutButton";

const Header = () => {
  const { user } = useAuth();

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <header className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <Logo />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {click && !user && user !== undefined && (
            <>
              <li>
                <Link
                  to="/auth/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up MOBILE
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/auth/log-in"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Log In MOBILE
                </Link>
              </li>
            </>
          )}

          {user && click && (
            <li className="nav-item nav-links-mobile">
              <LogOutButton />
            </li>
          )}
          {user && (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="nav-links" onClick={closeMobileMenu}>
                {user ? `Welcome ${user.name}` : "Welcome"}{" "}
                <i className="fas fa-caret-down" />
              </div>

              {dropdown && <Dropdown />}
            </li>
          )}
          {!click && (
            <>
              {!user && user !== undefined && (
                <li className="nav-item">
                  <Link
                    to="/auth/log-in"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Log In
                  </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <LogOutButton />
                </li>
              )}
              {!user && user !== undefined && (
                <li className="nav-item">
                  <SignUpButton />
                </li>
              )}
            </>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
