import React from "react";
import "./ModulesList.css";
import { Link } from "react-router-dom";

const ModulesList = (id) => {
  return (
    <>
      <ul id={id} className="modules-list">
        <Link to="/">
          <li>HTML</li>
        </Link>
        <Link to="/">
          <li>CSS</li>
        </Link>
        <Link to="/">
          <li>CLI | GIT</li>
        </Link>
        <Link to="/">
          <li>JavaScript</li>
        </Link>
        <Link to="/">
          <li>Browsers</li>
        </Link>
        <Link to="/">
          <li>Using APIs</li>
        </Link>
        <Link to="/">
          <li>Node.js</li>
        </Link>
        <Link to="/">
          <li>Databases</li>
        </Link>
        <Link to="/">
          <li>React</li>
        </Link>
      </ul>
    </>
  );
};

export default ModulesList;
