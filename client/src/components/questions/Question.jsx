import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import QuestionFooter from "./QuestionFooter";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./question.module.css";

const Question = ({ question, isUserQus = false }) => {
  const id = question._id;

  const [deleteStarted, setDeleteStarted] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/userQuestions/delete/${id}`,
    (res) => {
      console.log(res);
    }
  );

  const navigate = useNavigate();

  const questionRoute = `${isUserQus ? "/user-profile" : ""}/questions/${id}`;

  useEffect(() => {
    const deleteQuestion = () => {
      if (confirm("Are you sure you want to delete this question?")) {
        performFetch({ method: "DELETE" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };
    if (deleteStarted) {
      deleteQuestion();
    }
    return () => {
      cancelFetch();
    };
  }, [deleteStarted]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <li className={classes.questionItem} style={{ listStyleType: "none" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Stack spacing={2} mb={4}>
          <Link to={questionRoute}>
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
          {isUserQus && (
            <IconButton onClick={() => setDeleteStarted(true)}>
              <DeleteIcon style={{ fontSize: "22px" }} />
            </IconButton>
          )}
        </Stack>
      </Stack>
      <QuestionFooter classes={classes} question={question} />
    </li>
  );
};

export default Question;
