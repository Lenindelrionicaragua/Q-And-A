import React from "react";
import "./Sorting.css";

const Sorting = ({
  handleSortByPopularity,
  handleSortByTime,
  isSortedByPopularity,
  isSortedByTime,
}) => {
  return (
    <div className="sorting-wrapper">
      <div className="sorting-icon">
        <span>-icon-</span>
      </div>
      <div className="sort-btn-wrapper">
        <p style={{ marginRight: "5px" }}>sort list of questions:</p>
        {isSortedByPopularity ? (
          <button
            className="popular-question-btn sort-active"
            onClick={handleSortByPopularity}
          >
            MOST POPULAR QUESTIONS
          </button>
        ) : (
          <button
            className="popular-question-btn "
            onClick={handleSortByPopularity}
          >
            MOST POPULAR QUESTIONS
          </button>
        )}

        {isSortedByTime ? (
          <button
            className="newest-question-btn sort-active"
            onClick={handleSortByTime}
          >
            NEWEST QUESTIONS
          </button>
        ) : (
          <button className="newest-question-btn " onClick={handleSortByTime}>
            NEWEST QUESTIONS
          </button>
        )}
      </div>
    </div>
  );
};

export default Sorting;
