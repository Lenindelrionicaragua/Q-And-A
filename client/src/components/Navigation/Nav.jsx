import React from "react";
import "./Nav.css";
import PrimaryButton from "../Buttons/PrimaryButton";

import homeIcon from "../../images/icons/home-white.png";
import homeIconHover from "../../images/icons/home.png";
import modulesIcon from "../../images/icons/compass-white.png";
import modulesIconHover from "../../images/icons/compass.png";

const Nav = () => {
  return (
    <>
      <nav className="site-nav" id="nav-sidebar">
        <div className="nav-buttons">
          <PrimaryButton
            text="HOME"
            addIcon={true}
            srcIcon={homeIcon}
            srcHoverIcon={homeIconHover}
          />
          <PrimaryButton
            text="MODULES"
            addIcon={true}
            srcIcon={modulesIcon}
            srcHoverIcon={modulesIconHover}
          />
        </div>
        <div className="user-area">
          <h3>
            Welcome <span className="username">Guest</span>
          </h3>
          <PrimaryButton text="Ask a Question" />
        </div>
      </nav>
    </>
  );
};

export default Nav;
