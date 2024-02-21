import React, { useState } from "react";
import "./PrimaryButtons.css";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";

const PrimaryButton = ({
  text,
  addIcon,
  srcIcon,
  srcHoverIcon,
  onClickHandler,
  textContainerClassName,
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
      <span className={textContainerClassName}>{text}</span>
    </button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string,
  addIcon: PropTypes.bool,
  srcIcon: PropTypes.string,
  srcHoverIcon: PropTypes.string,
  onClickHandler: PropTypes.func,
  textContainerClassName: PropTypes.string,
};

PrimaryButton.defaultProps = {
  text: "",
  addIcon: false,
  srcIcon: "",
  srcHoverIcon: "",
  onClickHandler: null,
  textContainerClassName: "",
};

export default PrimaryButton;
