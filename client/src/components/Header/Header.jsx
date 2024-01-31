import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo";
import PrimaryButton from "../Buttons/PrimaryButton";

const Header = () => {
  return (
    <>
      <header>
        <div id="header-logo">
          <Logo />
        </div>
        <div className="header-buttons">
          <PrimaryButton text="Log in" />
          <PrimaryButton text="Sign up" />
        </div>
      </header>
    </>
  );
};

export default Header;
