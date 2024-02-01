import React from "react";
import "./SearchBar.css";

const SearchBar = ({ runSearch }) => {
  const [module, setModule] = React.useState("");

  return (
    <div className="search-form-wrapper">
      <p>Search in all questions:</p>
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault();
          runSearch(module);
        }}
      >
        <input
          type="text"
          value={module}
          onChange={(event) => {
            setModule(event.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
