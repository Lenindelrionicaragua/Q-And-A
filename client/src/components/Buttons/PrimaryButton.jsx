import React, { useState } from "react";
import "./Buttons.css";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";

// This button style includes the option to have an icon
//and handle the  change of the icon based on mouse hover/enter
const PrimaryButton = ({
  text,
  addIcon,
  srcIcon,
  srcHoverIcon,
  onClickHandler,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (onClickHandler) {
      onClickHandler();
    }
  };

  return (
    <button
      className="primary-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
  onClickHandler: PropTypes.func,
};

PrimaryButton.defaultProps = {
  text: "",
  addIcon: false,
  srcIcon: "",
  srcHoverIcon: "",
  onClickHandler: null,
};

export default PrimaryButton;
