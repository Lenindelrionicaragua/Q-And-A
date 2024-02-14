import React, { useState } from "react";
import "./MultipleChoiceModules.css";

const modules = [
  "HTML",
  "CSS",
  "CLI|GIT",
  "JavaScript",
  "Browsers",
  "Using APIs",
  "NodeJs",
  "Databases",
  "React",
];

const MultipleChoiceModules = ({ onModulesSelect }) => {
  const [selectedModules, setSelectedModules] = useState([]);

  const handleModuleToggle = (module) => {
    if (selectedModules.includes(module)) {
      setSelectedModules(
        selectedModules.filter((selectedModule) => selectedModule !== module)
      );
    } else {
      if (selectedModules.length < 3) {
        setSelectedModules([...selectedModules, module]);
      }
    }
  };

  React.useEffect(() => {
    onModulesSelect(selectedModules);
  }, [selectedModules, onModulesSelect]);

  return (
    <div id="multipleChoiceModules">
      <div id="modulesInputArea">
        {modules.map((module) => (
          <div className="moduleOption" key={module}>
            <input
              type="checkbox"
              id={module}
              checked={selectedModules.includes(module)}
              onChange={() => handleModuleToggle(module)}
              disabled={
                !selectedModules.includes(module) &&
                selectedModules.length === 3 &&
                !selectedModules.includes(module)
              }
            />
            <label htmlFor={module}>{module}</label>
          </div>
        ))}
      </div>
      {selectedModules.length === 0 && (
        <p className="instructions">Please select at least one module.</p>
      )}
      {selectedModules.length > 3 && (
        <p className="instructions">You can only select up to 3 modules.</p>
      )}
    </div>
  );
};

export default MultipleChoiceModules;
