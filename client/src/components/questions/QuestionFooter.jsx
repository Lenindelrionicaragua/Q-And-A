import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TimeAgo from "../TimeAgo/TimeAgo";

const QuestionFooter = (props) => {
  const { classes, question } = props;

  return (
    <Stack
      flex={1}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={3}
    >
      <ul className={classes.tags}>
        {question.module_ids?.map((tag) => (
          <li key={tag}>
            <span>{tag}</span>
          </li>
        ))}
      </ul>
      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        flexWrap="wrap"
        rowGap={2}
      >
        {/* <Typography>{question.answers.length} Answers</Typography> */}
        <Typography>{question.like_counter} Like</Typography>
        <Typography>{question.visit_counter} Views</Typography>
        <Typography>Asked by:{question.user_name}</Typography>
        <Typography>
          <TimeAgo createdAt={question.created_at} />
        </Typography>
      </Stack>
    </Stack>
  );
};

export default QuestionFooter;
