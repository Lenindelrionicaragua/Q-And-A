import React, { memo } from "react";
import "./AnswerBox.css";
import PropTypes from "prop-types";

const AnswerBox = ({ answer }) => {
  return (
    <div className="answer-wrapper">
      <p>{answer.answer_content}</p>
      <div className="answer-pins">
        <span className="pin">{answer.like_counter} LIKES</span>
        <span className="pin">
          Answered by {answer.userName} {answer.time} mins ago
        </span>
      </div>
    </div>
  );
};

AnswerBox.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default memo(AnswerBox);
