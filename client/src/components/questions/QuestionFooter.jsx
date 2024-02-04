import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const QuestionFooter = ({ classes, question }) => {
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
        {question.module.map((tag) => (
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
        <Typography>{question.answers.length} Answers</Typography>
        <Typography>{question.likes} Like</Typography>
        <Typography>{question.views} Views</Typography>
        <Typography> Asked by:{question.author}</Typography>
        <Typography>{question.date}</Typography>
      </Stack>
    </Stack>
  );
};

export default QuestionFooter;
