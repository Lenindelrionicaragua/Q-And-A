import React from "react";
import "./ModulesList.css";
import { Link } from "react-router-dom";

const ModulesList = (id) => {
  return (
    <>
      <ul id={id} className="modules-list">
        <Link to="/html">
          <li>HTML</li>
        </Link>
        <Link to="/css">
          <li>CSS</li>
        </Link>
        <Link to="/cli-git">
          <li>CLI | GIT</li>
        </Link>
        <Link to="/javascript">
          <li>JavaScript</li>
        </Link>
        <Link to="/browsers">
          <li>Browsers</li>
        </Link>
        <Link to="/using-apis">
          <li>Using APIs</li>
        </Link>
        <Link to="/nodejs">
          <li>Node.js</li>
        </Link>
        <Link to="/databases">
          <li>Databases</li>
        </Link>
        <Link to="/react">
          <li>React</li>
        </Link>
      </ul>
    </>
  );
};

export default ModulesList;
