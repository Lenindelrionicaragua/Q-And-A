import React from "react";
import { useAuth } from "../../Context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import QuestionFooter from "./QuestionFooter";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./question.module.css";

const Question = ({ question, onDelete }) => {
  const questionId = question._id;
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isLoading, error, performFetch } = useFetch(
    `/questions/${questionId}/delete`,
    (res) => {
      onDelete?.((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
      alert(res.msg);

      //Can't perform a React state update on an unmounted component
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  );
  console.log(error);
  function deleteQuestionHandler() {
    if (confirm("Are you sure you want to delete this question?")) {
      performFetch({ method: "DELETE" });
    }
  }

  const allowToDelete = user?.id === question.user_id;

  return (
    <li className={classes.questionItem}>
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
          <IconButton>
            <ThumbUpIcon style={{ fontSize: "22px" }} />
          </IconButton>
          <IconButton onClick={deleteQuestionHandler} disabled={!allowToDelete}>
            {!isLoading ? <DeleteIcon style={{ fontSize: "22px" }} /> : "..."}
          </IconButton>
        </Stack>
      </Stack>
      <QuestionFooter
        classes={classes}
        question={{ ...question, like_counter: 0 }}
      />
    </li>
  );
};

export default Question;
