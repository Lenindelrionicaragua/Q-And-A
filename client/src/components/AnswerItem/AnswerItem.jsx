import React, { memo, useEffect } from "react";
import "./AnswerItem.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Answer = ({ answer, handleDelete, isAnswerBelongsToUser, question }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isApproved, setIsApproved] = useState(answer.isApproved ?? false);
  const [likeCount, setLikeCount] = useState(answer?.like_counter ?? 0);
  const { id } = useParams();

  const getFormattedDate = (date) => {
    if (!date) return "unknown date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    answer = { ...answer, isApproved };
  }, [isApproved]);

  const { performFetch: fetchLikeCount } = useFetch(
    `/questions/${id}/answers/${answer._id}/like`,
    ({ result }) => {
      const { likeCounter, isLiked } = result;
      setLikeCount(likeCounter ?? 0);
      setIsLiked(isLiked);
    }
  );

  const handleLike = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    };

    fetchLikeCount(options);
  };

  const isQuestionBelongsToUser = question?.user_id === user?.id;

  const { performFetch: fetchApproveValue } = useFetch(
    `/questions/${id}/answers/${answer._id}/approve`,
    (result) => {
      setIsApproved(result.isApproved);
    }
  );

  const handleApprove = () => {
    const approve = {
      current_user_id: user?.id ?? user?.name,
      answer_owner_user_id: answer.user_id,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(approve),
    };

    fetchApproveValue(options);
  };

  return (
    <div className="answer-wrapper">
      <div className="button-group">
        <Button
          className="icon-button"
          disabled={
            user && isQuestionBelongsToUser && !isAnswerBelongsToUser
              ? false
              : true
          }
          onClick={handleApprove}
        >
          {isApproved ? (
            <StarBorderIcon style={{ fontSize: "18px", color: "#76f013" }} />
          ) : (
            <StarBorderIcon style={{ fontSize: "18px" }} />
          )}
        </Button>
        <Button
          className="icon-button"
          onClick={handleLike}
          disabled={!user || isAnswerBelongsToUser ? true : false}
        >
          {isLiked ? (
            <ThumbUpIcon style={{ fontSize: "18px", color: "#76f013" }} />
          ) : (
            <ThumbUpIcon
              style={{ fontSize: "18px" }}
              disabled={!user || isAnswerBelongsToUser ? true : false}
            />
          )}
        </Button>
        <Button
          className={
            user && isAnswerBelongsToUser ? "icon-button delete" : "icon-button"
          }
          disabled={user && isAnswerBelongsToUser ? false : true}
          onClick={() => handleDelete(answer._id)}
        >
          <DeleteIcon style={{ fontSize: "18px" }} />
        </Button>
      </div>
      <p>{answer?.answer_content}</p>
      <div className="answer-pins">
        <span className="pin">{likeCount} LIKES</span>
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
