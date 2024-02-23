import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import styles from "./QuestionFooter.module.css";

const QuestionFooter = ({ question }) => {
  const formattedDate = !question.created_at
    ? "unknown date"
    : new Date(question.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  return (
    <Stack
      flex={1}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={3}
    >
      <ul className={styles.tags}>
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
        <Typography>{question.like_counter} Like</Typography>
        <Typography>{question.visit_counter} Views</Typography>
        <Typography>Asked by:{question.user_name}</Typography>
        <Typography>{formattedDate}</Typography>
      </Stack>
    </Stack>
  );
};

export default QuestionFooter;
