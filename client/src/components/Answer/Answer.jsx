import React, { memo } from "react";
import "./Answer.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const Answer = ({ answer }) => {
  return (
    <div className="answer-wrapper">
      <Button>
        <ThumbUpIcon style={{ fontSize: "18px" }} />
      </Button>
      <p>{answer.answer_content}</p>
      <div className="answer-pins">
        <span className="pin">{answer.like_counter} LIKES</span>
        <span className="pin">Answered by @username ?? mins ago</span>
      </div>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default memo(Answer);
