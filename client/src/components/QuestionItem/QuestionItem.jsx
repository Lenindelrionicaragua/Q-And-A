import React from "react";
import { Link } from "react-router-dom";
import QuestionFooter from "../QuestionFooter/QuestionFooter";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import classes from "./QuestionItem.module.css";

const QuestionItem = ({ question }) => {
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
        </Stack>
      </Stack>
      <QuestionFooter question={question} />
    </li>
  );
};

export default QuestionItem;
