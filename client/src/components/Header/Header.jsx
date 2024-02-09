import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <div id="header-logo">
          <Logo />
        </div>
        <div className="header-buttons">
          <Link to="/user/login">
            <PrimaryButton text="Log in" />
          </Link>
          <Link to="/user/sign-up">
            <PrimaryButton text="Sign up" />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
