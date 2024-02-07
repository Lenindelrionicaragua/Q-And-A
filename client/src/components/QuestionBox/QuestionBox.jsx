import React from "react";
import "./QuestionBox.css";

import PropTypes from "prop-types";

const QuestionBox = ({ question }) => {
  return (
    <div className="question-wrapper">
      <a className="like-icon">like icon</a>
      <h1>{question.title}</h1>
      <h3>{question.subtitle}</h3>
      <p>{question.content}</p>
      <div className="question-pins">
        <span className="pin tag">{question.module}</span>
        <span className="flex-spanner"></span>
        <span className="pin">{question.answerCount} ANSWERS</span>
        <span className="pin">{question.likeCount} LIKES</span>
        <span className="pin">{question.viewCount} VIEWS</span>
        <span className="pin">Asked by {question.userName}</span>
        <span className="pin"> {question.time} mins ago</span>
      </div>
    </div>
  );
};

QuestionBox.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionBox;
