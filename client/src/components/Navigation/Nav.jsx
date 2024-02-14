import React, { useState } from "react";
import "./Nav.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import ModulesList from "../ModulesList/ModulesList";

import homeIcon from "../../images/icons/home-white.png";
import homeIconHover from "../../images/icons/home.png";
import modulesIcon from "../../images/icons/compass-white.png";
import modulesIconHover from "../../images/icons/compass.png";
import plusIcon from "../../images/icons/plus-white.png";
import plusIconHover from "../../images/icons/plus.png";

import { Link } from "react-router-dom";

const Nav = () => {
  const [isModulesListVisible, setModulesListVisibility] = useState(false);

  const handleModulesButtonClick = () => {
    // Toggle the visibility of the Modules list when the button is clicked
    setModulesListVisibility(!isModulesListVisible);
  };

  return (
    <>
      <nav className="site-nav" id="nav-sidebar">
        <div className="nav-buttons">
          <Link to="/">
            <PrimaryButton
              text="HOME"
              addIcon={true}
              srcIcon={homeIcon}
              srcHoverIcon={homeIconHover}
            />
          </Link>
          <PrimaryButton
            text="MODULES"
            addIcon={true}
            srcIcon={modulesIcon}
            srcHoverIcon={modulesIconHover}
            onClickHandler={handleModulesButtonClick}
          />
          {isModulesListVisible && <ModulesList />}
        </div>
        <div className="user-area">
          {/* <h3>
            Welcome <span className="username">Guest</span>
          </h3> */}
          <Link to="/post-question">
            <PrimaryButton
              text="Ask new Question"
              addIcon={true}
              srcIcon={plusIcon}
              srcHoverIcon={plusIconHover}
            />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
