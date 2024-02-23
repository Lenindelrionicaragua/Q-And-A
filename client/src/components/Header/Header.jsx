import React, { useState } from "react";
import { SignUpButton } from "../SignUpButton/SignUpButton";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";
import Dropdown from "../Dropdown/Dropdown";
import { useAuth } from "../../contexts/AuthContext";
import LogOutButtonToggleMenu from "../LogOutButtonToggleMenu/LogOutButtonToggleMenu";

const Header = () => {
  const { user } = useAuth();

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleDropdownMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="header-logo" onClick={closeMobileMenu}>
          <Logo />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "header-menu active" : "header-menu"}>
          {click && !user && (
            <>
              <li>
                <Link
                  to="/auth/sign-up"
                  className="header-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
              <li className="header-item">
                <Link
                  to="/auth/log-in"
                  className="header-links"
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
              </li>
            </>
          )}
          {user && !click && (
            <li
              className="header-item"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <div className="header-links" onClick={closeMobileMenu}>
                {user ? `Welcome ${user.name}` : "Welcome"}{" "}
                <i className="fas fa-caret-down" />
              </div>
              {dropdown && <Dropdown />}
            </li>
          )}

          {user && click && (
            <li>
              <div className="header-toggle-menu" onClick={closeMobileMenu}>
                {user ? `Welcome ${user.name}` : "Welcome"}{" "}
              </div>
              <hr></hr>
              {dropdown && <Dropdown />}
            </li>
          )}
          {user && click && (
            <li className="header-item">
              <Link to="/" className="header-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
          )}
          {user && click && (
            <li className="header-item">
              <Link
                to="/user-profile"
                className="header-links"
                onClick={closeMobileMenu}
              >
                User Profile
              </Link>
            </li>
          )}

          {user && click && (
            <li className="header-item">
              <Link
                to="/post-question"
                className="header-links"
                onClick={closeMobileMenu}
              >
                Post Question
              </Link>
            </li>
          )}
          {user && click && (
            <li className="header-item">
              <Link
                to="/user-profile/questions"
                className="header-links"
                onClick={closeMobileMenu}
              >
                My Question
              </Link>
            </li>
          )}
          {user && click && (
            <li className="header-item header-links-mobile">
              <LogOutButtonToggleMenu />
            </li>
          )}
          {!click && (
            <>
              {!user && (
                <li className="header-item">
                  <Link
                    to="/auth/log-in"
                    className="header-links"
                    onClick={closeMobileMenu}
                  >
                    Log In
                  </Link>
                </li>
              )}
              {!user && (
                <li className="header-item">
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
