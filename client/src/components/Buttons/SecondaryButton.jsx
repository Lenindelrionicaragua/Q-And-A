import React from "react";
import "./Buttons.css";
import PropTypes from "prop-types";

const SecondaryButton = ({ text }) => {
  return <button className="secondary-button">{text}</button>;
};

SecondaryButton.propTypes = {
  text: PropTypes.string,
};

SecondaryButton.defaultProps = {
  text: "",
};

export default SecondaryButton;
