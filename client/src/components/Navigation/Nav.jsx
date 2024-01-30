import React from "react";
import "./Nav.css";
import Logo from "../Logo/Logo";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
// import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <header className="site-nav">
        <div id="header-logo">
          <Logo />
        </div>
        <div className="header-buttons">
          <SecondaryButton text="Log in" />
          <PrimaryButton text="Sign up" />
        </div>
      </header>
      {/* <h1 className="site-nav">Try text</h1> */}
      <nav>{/* //buttons */}</nav>
    </>
  );
};

export default Nav;
