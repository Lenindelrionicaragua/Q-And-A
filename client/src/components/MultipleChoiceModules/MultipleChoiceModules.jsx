import React, { useState } from "react";

const MultipleChoiceModules = ({ onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const options = [
    "CLI | GIT",
    "JavaScript",
    "Browsers",
    "Using APIs",
    "Node.js",
    "Databases",
    "React",
    "Project",
  ];

  const handleChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (selectedOptions.length >= 3) {
        setError("You can select at most 3 options.");
        return;
      }
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }

    if (selectedOptions.length === 0 && error) {
      setError("");
    }
  };

  const handleBlur = () => {
    if (selectedOptions.length === 0) {
      setError("You must select at least 1 option.");
    } else {
      setError("");
    }
  };

  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={option}
            value={option}
            onChange={handleChange}
            onBlur={handleBlur}
            checked={selectedOptions.includes(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={() => onSelect(selectedOptions)}>Submit</button>
    </div>
  );
};

export default MultipleChoiceModules;
