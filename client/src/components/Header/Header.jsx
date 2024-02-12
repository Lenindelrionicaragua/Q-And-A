import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

const Header = () => {
  const userName = "Usuario";

  return (
    <>
      <header>
        <div id="header-logo">
          <Logo />
        </div>
        <div className="header-buttons">
          <Link to="/auth/sign-up">
            <PrimaryButton text="Sign up" />
          </Link>
          <Link to="/auth/log-in">
            <PrimaryButton text="Log in" />
          </Link>
          <Link to="/user-profile">
            <UserMenu userName={userName} />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
