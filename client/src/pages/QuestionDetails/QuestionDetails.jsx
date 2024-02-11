import React, { useEffect, useState } from "react";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import AnswerBox from "../../components/AnswerBox/AnswerBox";
import CreateAnswerBox from "../../components/CreateAnswerBox/CreateAnswerBox";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const QuestionDetail = () => {
  const [question, setQuestion] = useState({});
  const { id } = useParams();

  const {
    isLoading: questionLoading,
    error: questionError,
    performFetch: performFetchQuestions,
    cancelFetch: cancelQuestionFetch,
  } = useFetch(`/questions/${id}`, (response) => setQuestion(response.result));

  useEffect(() => {
    performFetchQuestions();

    return cancelQuestionFetch;
  }, []);

  const { performFetch: performFetchAnswer } = useFetch(
    "/answer/create",
    (response) => {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: [...prevQuestion.answers, response.result],
      }));
    }
  );

  const handleCreateAnswer = (answerContent) => {
    const answer = {
      question_id: id,
      answer_content: answerContent,
      user_id: 1,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    };

    performFetchAnswer(options);
  };

  return (
    <div>
      <QuestionBox question={question} />
      {question.answers?.map((answer, i) => (
        <AnswerBox key={i} answer={answer} />
      ))}
      <CreateAnswerBox handleSubmit={handleCreateAnswer} />
    </div>
  );
};

export default QuestionDetail;
