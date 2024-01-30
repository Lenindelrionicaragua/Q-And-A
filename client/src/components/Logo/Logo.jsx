import React from "react";
import "./Logo.css";
import AppLogo from "../../images/Q&A Sessions.png";

const Logo = () => {
  return (
    <div id="logoImage">
      <img alt="Q&A Sessions Logo" src={AppLogo} />
    </div>
  );
};

export default Logo;
