import React from "react";
import Answer from "./Answer";
import Typography from "@mui/material/Typography";

const UsersAnswersList = ({ answers }) => {
  const hasAnswers = answers?.length > 0;
  let content = <Typography>No answers for your question yet!</Typography>;

  if (hasAnswers) {
    content = (
      <ul style={{ marginTop: "2rem" }}>
        {answers.map((answer) => (
          <Answer key={answer._id} answer={answer} />
        ))}
      </ul>
    );
  }

  return content;
};

export default UsersAnswersList;
