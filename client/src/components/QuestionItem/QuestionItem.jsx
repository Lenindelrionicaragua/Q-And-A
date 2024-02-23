import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import QuestionFooter from "../QuestionFooter/QuestionFooter";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import "./QuestionItem.css";

const QuestionItem = ({ question, onDelete }) => {
  const questionId = question._id;
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(question.like_counter ?? 0);
  const navigate = useNavigate();

  const {
    isLoading: likeLoading,
    error: likeError,
    performFetch: addLike,
  } = useFetch(`/questions/${questionId}/like`, (res) => {
    if (res.likeItem) {
      setLikesCount((prevLikesCount) => prevLikesCount + 1);
    } else {
      setLikesCount((prevLikesCount) => prevLikesCount - 1);
    }
    return;
    //console.log(res.likeItem);
  });

  const {
    isLoading,
    error: deleteError,
    performFetch,
  } = useFetch(`/questions/${questionId}/delete`, (res) => {
    onDelete?.((prevQuestions) =>
      prevQuestions.filter((question) => question._id !== questionId)
    );
    alert(res.msg);

    //Can't perform a React state update on an unmounted component
    setTimeout(() => {
      navigate("/");
    }, 1000);
  });

  function deleteQuestionHandler() {
    if (confirm("Are you sure you want to delete this question?")) {
      performFetch({ method: "DELETE" });
    }
  }
  function addLikeHandler() {
    addLike({
      method: "POST",
      body: JSON.stringify({
        user_id: user.id,
        question_id: questionId,
        like_timestamp: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: user.id,
      },
    });
  }

  useEffect(() => {
    if (!likeError || !deleteError) return;
    if (likeError) {
      alert(likeError);
    }
    if (deleteError) {
      alert(deleteError);
    }
  }, [likeError, deleteError]);

  const allowToDelete = user?.id === question.user_id;
  const allowToLike = user
    ? user.id === question.user_id
      ? false
      : true
    : false;

  return (
    <div className="questionItem">
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Stack spacing={2} mb={4}>
          <Link to={`/questions/${question._id}`}>
            <Typography
              component="h3"
              variant="h6"
              fontWeight="bold"
              color="primary.main"
            >
              {question.question_title}
            </Typography>
          </Link>
          <Typography component="span">{question.question_content}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={addLikeHandler} disabled={!allowToLike}>
            {!likeLoading ? (
              <ThumbUpIcon style={{ fontSize: "22px" }} />
            ) : (
              "..."
            )}
          </IconButton>
          <IconButton onClick={deleteQuestionHandler} disabled={!allowToDelete}>
            {!isLoading ? <DeleteIcon style={{ fontSize: "22px" }} /> : "..."}
          </IconButton>
        </Stack>
      </Stack>
      <QuestionFooter question={{ ...question, like_counter: likesCount }} />
    </div>
  );
};

export default QuestionItem;
