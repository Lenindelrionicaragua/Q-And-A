import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const QuestionFooter = ({ question }) => {
  const formattedDate = !question.created_at
    ? "unknown date"
    : new Date(question.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
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
      <ul className="question-pins">
        {question.module_ids?.map((tag) => (
          <li key={tag} className="pin tag">
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
        <Typography className="pin">{question.like_counter} Like</Typography>
        <Typography className="pin">{question.visit_counter} Views</Typography>
        <Typography className="pin">
          Asked by {question.user_name} on {formattedDate}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default QuestionFooter;
