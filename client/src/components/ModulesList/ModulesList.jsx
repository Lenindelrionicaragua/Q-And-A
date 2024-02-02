import React from "react";
import "./ModulesList.css";

const ModulesList = (id) => {
  return (
    <>
      <ul id={id} className="modules-list">
        <li>CLI | GIT</li>
        <li>JavaScript</li>
        <li>Browsers</li>
        <li>Using APIs</li>
        <li>Node.js</li>
        <li>Databases</li>
        <li>React</li>
        <li>Project</li>
      </ul>
    </>
  );
};

export default ModulesList;
