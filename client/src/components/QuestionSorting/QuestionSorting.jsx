import React from "react";
import "./QuestionSorting.css";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const QuestionSorting = ({
  handleSortByPopularity,
  handleSortByTime,
  isSortedByPopularity,
  isSortedByTime,
}) => {
  return (
    <div className="sorting-wrapper">
      <div className="sorting-icon"></div>
      <div className="sort-btn-wrapper">
        <p style={{ marginRight: "12px", fontSize: "12px" }}>sort by:</p>
        {isSortedByPopularity ? (
          <button
            className="popular-question-btn sort-active tag pin"
            onClick={handleSortByPopularity}
          >
            MOST POPULAR QUESTIONS <SwapVertIcon fontSize="small" />
          </button>
        ) : (
          <button
            className="popular-question-btn tag pin"
            onClick={handleSortByPopularity}
          >
            MOST POPULAR QUESTIONS <SwapVertIcon fontSize="small" />
          </button>
        )}

        {isSortedByTime ? (
          <button
            className="newest-question-btn sort-active tag pin"
            onClick={handleSortByTime}
          >
            NEWEST QUESTIONS <SwapVertIcon fontSize="small" />
          </button>
        ) : (
          <button
            className="newest-question-btn tag pin"
            onClick={handleSortByTime}
          >
            NEWEST QUESTIONS <SwapVertIcon fontSize="small" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionSorting;
