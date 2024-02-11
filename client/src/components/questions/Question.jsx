import React from "react";
import { Link } from "react-router-dom";
import QuestionFooter from "./QuestionFooter";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import classes from "./question.module.css";

const Question = ({ question }) => {
  return (
    <li className={classes.questionItem}>
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Stack spacing={2} mb={4}>
          <Link to={`questions/${question._id}`}>
            <Typography
              component="h3"
              variant="h6"
              fontWeight="bold"
              color="primary.main"
            >
              {question.title}
            </Typography>
          </Link>
          <Typography component="span">{question.question_content}</Typography>
        </Stack>

        <Button>
          <ThumbUpIcon />
        </Button>
      </Stack>
      <QuestionFooter classes={classes} question={question} />
    </li>
  );
};

export default Question;
