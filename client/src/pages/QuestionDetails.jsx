import React from "react";
import { useParams } from "react-router-dom";

const QuestionDetails = () => {
  const { id } = useParams();

  return <h2>Question ID: {id}</h2>;
};

export default QuestionDetails;
