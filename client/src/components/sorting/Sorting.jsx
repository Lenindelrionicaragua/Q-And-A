import React from "react";
import "./Sorting.css";

const Sorting = (handlePopularQuestions) => {
  return (
    <div className="sorting-wrapper">
      <div className="sorting-icon">
        <span>-icon-</span>
      </div>
      <div className="sort-btn-wrapper">
        <p style={{ marginRight: "5px" }}>sort list of questions:</p>
        <button
          className="popular-question-btn"
          onClick={handlePopularQuestions}
        >
          MOST POPULAR QUESTIONS
        </button>
        <button className="newest-question-btn">NEWEST QUESTIONS</button>
      </div>
    </div>
  );
};

export default Sorting;
