import React from "react";
import PropTypes from "prop-types";

const Icon = ({ src }) => {
  return (
    <div className="icon">
      <img src={src} alt="icon" />
    </div>
  );
};

Icon.propTypes = {
  src: PropTypes.string,
};

Icon.defaultProps = {
  src: "",
};

export default Icon;
