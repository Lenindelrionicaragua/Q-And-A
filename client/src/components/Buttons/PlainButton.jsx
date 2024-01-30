import React from "react";
import "./Buttons.css";
import PropTypes from "prop-types";

const PlainButton = ({ text }) => {
  return <button className="plain-button">{text}</button>;
};

PlainButton.propTypes = {
  text: PropTypes.string,
};

PlainButton.defaultProps = {
  text: "",
};

export default PlainButton;
