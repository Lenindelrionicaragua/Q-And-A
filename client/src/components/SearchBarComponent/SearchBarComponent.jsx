import React, { memo, useState } from "react";
import "./SearchBarComponent.css";

function SearchBar({ runSearch }) {
  const [term, setTerm] = useState("");
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const isInputCleared = inputValue === "" && term !== "";

    if (inputValue?.length >= 3 || isInputCleared) {
      runSearch(inputValue);
    }

    setTerm(inputValue);
  };

  return (
    <div className="search-form-wrapper">
      <form className="search-form">
        <input
          type="text"
          value={term}
          placeholder="Search in all questions"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default memo(SearchBar);
