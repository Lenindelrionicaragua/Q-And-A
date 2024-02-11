import React from "react";
import "./QuestionBox.css";

import PropTypes from "prop-types";

const QuestionBox = ({ question }) => {
  return (
    <div className="question-wrapper">
      <a className="like-icon">like icon</a>
      <h3>{question.title}</h3>
      <p>{question.question_content}</p>
      <div className="question-pins">
        {question.module?.map((module, i) => (
          <span key={i} className="pin tag">
            {module}
          </span>
        ))}
        <span className="flex-spanner"></span>
        <span className="pin">{question.answerCount} ANSWERS</span>
        <span className="pin">{question.likes} LIKES</span>
        <span className="pin">{question.views} VIEWS</span>
        <span className="pin">Asked by {question.author}</span>
        <span className="pin"> {question.time} mins ago</span>
      </div>
    </div>
  );
};

QuestionBox.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionBox;
