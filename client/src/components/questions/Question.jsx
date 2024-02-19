import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import QuestionFooter from "./QuestionFooter";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import classes from "./question.module.css";

const Question = ({ question }) => {
  const { user } = useAuth();
  const { isLoading, error, performFetch } = useFetch(
    `/questions/like/${question._id}`,
    (res) => {
      console.log(res);
      console.log(error);
      console.log(isLoading);
    }
  );
  console.log(question);
  const [likesCount, setLikesCount] = useState(question.like_counter || 0);
  const [likeIds] = useState(question.like_ids || []);

  function sendUserLike() {
    if (!user) {
      alert("You need to login to like this question!");
      return;
    }
    console.log(setLikesCount);
    //console.log(setLikesIds);
    console.log(likeIds);
    performFetch({ method: "POST", body: JSON.stringify({ userId: user.id }) });
  }

  useEffect(() => {}, []);

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
          <IconButton onClick={sendUserLike}>
            <ThumbUpIcon style={{ fontSize: "22px" }} />
          </IconButton>
        </Stack>
      </Stack>
      <QuestionFooter
        classes={classes}
        question={{ ...question, like_counter: likesCount }}
      />
    </li>
  );
};

export default Question;
