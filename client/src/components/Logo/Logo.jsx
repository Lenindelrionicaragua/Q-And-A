import React from "react";
import "./Logo.css";
import appLogo from "../../images/Q&A Sessions.png";

const Logo = () => {
  return (
    <div className="logoImage">
      <img alt="Q&A Sessions Logo" src={appLogo} />
    </div>
  );
};

export default Logo;
