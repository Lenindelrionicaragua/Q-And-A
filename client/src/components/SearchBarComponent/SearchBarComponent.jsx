import React, { memo } from "react";
import "./SearchBarComponent.css";

const SearchBar = ({ searchTerm, runSearch }) => {
  const [term, setTerm] = React.useState(searchTerm);

  return (
    <div className="search-form-wrapper">
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault();
          runSearch(term);
        }}
      >
        <input
          type="text"
          value={term}
          placeholder="Search in all questions"
          onChange={(event) => {
            setTerm(event.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default memo(SearchBar);
