import React, { useEffect, useState } from "react";
import Answer from "../../components/Answer/Answer";
import CreateAnswer from "../../components/CreateAnswer/CreateAnswer";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Question from "../../components/questions/Question";
import "./QuestionDetail.css";

const QuestionDetail = () => {
  const [question, setQuestion] = useState({});
  const { id } = useParams();

  const {
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
      <div className="question-wrapper">
        <Question question={question} />
      </div>
      {question.answers?.map((answer, i) => (
        <Answer key={i} answer={answer} />
      ))}
      <CreateAnswer handleSubmit={handleCreateAnswer} />
    </div>
  );
};

export default QuestionDetail;
