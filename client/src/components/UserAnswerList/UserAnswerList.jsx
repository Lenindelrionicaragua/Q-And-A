import React from "react";
import AnswerItem from "../AnswerItem/AnswerItem";
import Typography from "@mui/material/Typography";

const UserAnswersList = ({ answers }) => {
  const hasAnswers = answers?.length > 0;
  let content = <Typography>No answers for your question yet!</Typography>;

  if (hasAnswers) {
    content = (
      <ul style={{ marginTop: "2rem" }}>
        {answers.map((answer) => (
          <AnswerItem key={answer._id} answer={answer} />
        ))}
      </ul>
    );
  }

  return content;
};

export default UserAnswersList;
