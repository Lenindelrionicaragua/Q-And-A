import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import ModulesList from "../ModulesList/ModulesList";
import homeIcon from "../../images/icons/home-white.png";
import homeIconHover from "../../images/icons/home-white.png";
import modulesIcon from "../../images/icons/compass-white.png";
import modulesIconHover from "../../images/icons/compass-white.png";
import plusIcon from "../../images/icons/plus-white.png";
import plusIconHover from "../../images/icons/plus-white.png";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isModulesListVisible, setModulesListVisibility] = useState(false);
  const [isSidebarVisible, setSidebarVisibility] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setSidebarVisibility(false);
        setModulesListVisibility(false);
      } else {
        setSidebarVisibility(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleModulesButtonClick = () => {
    setModulesListVisibility(!isModulesListVisible);
  };

  return (
    <>
      {isSidebarVisible && (
        <nav className="site-sidebar" id="nav-sidebar">
          <div className="sidebar-buttons">
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
          <div className="post-question">
            <Link to="/post-question">
              <PrimaryButton
                text="Post Question"
                addIcon={true}
                srcIcon={plusIcon}
                srcHoverIcon={plusIconHover}
                textContainerClassName="custom-text-container"
              />
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
