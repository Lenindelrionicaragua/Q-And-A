import React, { useState } from "react";
import "./Buttons.css";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";

// This button style includes the option to have an icon
//and handle the  change of the icon based on mouse hover/enter
const PrimaryButton = ({ text, addIcon, srcIcon, srcHoverIcon }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      className="primary-button icon-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {addIcon ? <Icon src={isHovered ? srcHoverIcon : srcIcon} /> : null}
      {text}
    </button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string,
  addIcon: PropTypes.bool,
  srcIcon: PropTypes.string,
  srcHoverIcon: PropTypes.string,
};

PrimaryButton.defaultProps = {
  text: "",
  addIcon: false,
  srcIcon: "",
  srcHoverIcon: "",
};

export default PrimaryButton;
