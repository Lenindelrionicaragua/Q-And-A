import React, { useEffect, useState } from "react";
import Answer from "../../components/Answer/Answer";
import CreateAnswer from "../../components/CreateAnswer/CreateAnswer";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Question from "../../components/questions/Question";
import "./QuestionDetails.css";
import { useAuth } from "../../Context/AuthContext";

const QuestionDetails = () => {
  const [question, setQuestion] = useState({});
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    performFetchQuestion();
    return cancelQuestionFetch;
  }, []);

  const {
    performFetch: performFetchQuestion,
    cancelFetch: cancelQuestionFetch,
  } = useFetch(`/questions/${id}`, (response) => {
    setQuestion(response.result);
  });

  const { performFetch: performFetchAnswer } = useFetch(
    "/answer/create",
    (response) => {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: [...prevQuestion.answers, response.answer],
      }));
    }
  );

  const handleCreateAnswer = (answerContent) => {
    const answer = {
      question_id: id,
      answer_content: answerContent,
      user_id: user?.id ?? "anonymous",
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

  const getDeleteUrl = (questionId, answerId) =>
    `/questions/${questionId}/answers/${answerId}/delete`;

  const { performFetch: performFetchDeleteAnswer } = useFetch(
    "", // We don't need to specify a route here, we will do that in the handleDelete function
    (response) => {
      if (response.success) {
        performFetchQuestion();
      }
    }
  );
  const handleDelete = (answerId) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    performFetchDeleteAnswer(options, getDeleteUrl(id, answerId));
  };

  const isAnswerBelongsToUser = (answer) => {
    return user?.id === answer.user_id;
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="question-wrapper">
        <Question question={question} />
      </div>
      {question.answers?.map((answer, i) => (
        <Answer
          key={i}
          answer={answer}
          handleDelete={handleDelete}
          isAnswerBelongsToUser={isAnswerBelongsToUser(answer)}
        />
      ))}
      <CreateAnswer handleSubmit={handleCreateAnswer} />
    </div>
  );
};

export default QuestionDetails;
