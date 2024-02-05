import React from "react";
import "./SearchBar.css";

const SearchBar = ({ runSearch }) => {
  const [module, setModule] = React.useState("");

  return (
    <div className="search-form-wrapper">
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
          placeholder="Search in all questions"
          onChange={(event) => {
            setModule(event.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
