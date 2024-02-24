import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import QuestionItem from "../../components/QuestionItem/QuestionItem";

import UserAnswersList from "../../components/UserAnswerList/UserAnswerList";

const UserQuestionDetailsPage = () => {
  const { questionId } = useParams();
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/userQuestions/${questionId}`,
    (res) => {
      setQuestion(res.result);
    }
  );

  const [question, setQuestion] = useState({});

  useEffect(() => {
    performFetch();

    return () => cancelFetch();
  }, [questionId]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <QuestionItem question={question} />
      <UserAnswersList answers={question.answers} />
    </div>
  );
};
export default UserQuestionDetailsPage;
