import React, { memo } from "react";
import "./Answer.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { useAuth } from "../../Context/AuthContext";

const Answer = ({ answer, handleDelete, isAnswerBelongsToUser }) => {
  const getFormattedDate = (date) => {
    if (!date) return "unknown date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { user } = useAuth();

  return (
    <div className="answer-wrapper">
      <div>
        <Button
          className="aswerLikeBtn"
          disabled={isAnswerBelongsToUser ? false : true}
        >
          <ThumbUpIcon style={{ fontSize: "18px" }} />
        </Button>
        <Button
          className="answerDeleteBtn"
          disabled={isAnswerBelongsToUser ? false : true}
          onClick={() => handleDelete(answer._id)}
        >
          <DeleteIcon style={{ fontSize: "18px" }} />
        </Button>
      </div>
      <p>{answer?.answer_content}</p>
      <div className="answer-pins">
        <span className="pin">{answer?.like_counter} LIKES</span>
        <span className="pin">
          Answered by {answer?.author ?? user?.name} on{" "}
          {getFormattedDate(answer?.created_at)}
        </span>
      </div>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default memo(Answer);
