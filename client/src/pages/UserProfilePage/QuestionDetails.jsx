import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Question from "../../components/questions/Question";
import CreateAnswer from "../../components/CreateAnswer/CreateAnswer";
import UsersAnswersList from "../../components/Answer/UsersAnswersList";
import Answer from "../../components/Answer/Answer";

const UserQuestionDetails = () => {
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
    console.log("run");
    return () => cancelFetch();
  }, [questionId]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  console.log(question);

  const handleAnswerSubmit = (answerContent) => {
    console.log("Submitted answer:", answerContent);
  };
  return (
    <div>
      <Question question={question} isUserQus={true} />
      <UsersAnswersList answers={question.answers} />

      {question.answer && <Answer answer={question.answer} />}

      <CreateAnswer handleSubmit={handleAnswerSubmit} />
    </div>
  );
};
export default UserQuestionDetails;
