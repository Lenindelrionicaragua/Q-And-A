import React from "react";
import "./Buttons.css";
import PropTypes from "prop-types";

const PrimaryButton = ({ text }) => {
  return (
    <button className="primary-button">
      {text}
    </button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string,
};

PrimaryButton.defaultProps = {
  text: "",
};

export default PrimaryButton;
