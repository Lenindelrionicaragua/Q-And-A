import React, { useEffect, useState } from "react";
import AnswerItem from "../../components/AnswerItem/AnswerItem";
import CreateAnswer from "../../components/CreateAnswer/CreateAnswer";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import QuestionItem from "../../components/QuestionItem/QuestionItem";
import "./QuestionDetailsPage.css";
import { useAuth } from "../../Context/AuthContext";

const QuestionDetailsPage = () => {
  const [question, setQuestion] = useState({});
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    fetchQuestion();
    return cancelQuestionFetch;
  }, []);

  const { performFetch: fetchQuestion, cancelFetch: cancelQuestionFetch } =
    useFetch(`/questions/${id}`, (response) => {
      setQuestion(response.result ?? {});
    });

  const { performFetch: createAnswer } = useFetch(
    "/answer/create",
    (response) => {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: [...(prevQuestion.answers ?? []), response?.answer ?? []],
      }));
    }
  );

  const handleCreateAnswer = (answerContent) => {
    const answer = {
      question_id: id,
      answer_content: answerContent,
      user_id: user?.id ?? user?.name,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    };

    createAnswer(options);
  };

  const getDeleteUrl = (questionId, answerId) =>
    `/questions/${questionId}/answers/${answerId}/delete`;

  const { performFetch: deleteAnswer } = useFetch(
    "", // We don't need to specify a route here, we will do that in the handleDelete function
    (response) => {
      if (response.success) {
        fetchQuestion();
      }
    }
  );
  const handleDelete = (answerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this answer?"
    );
    if (confirmDelete) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      deleteAnswer(options, getDeleteUrl(id, answerId));
    }
  };

  const isAnswerBelongsToUser = (answer) => {
    return user?.id && user?.id === answer.user_id;
  };

  return (
    <div className="question-details-container">
      <QuestionItem question={question} />
      {question.answers?.map((answer, i) => (
        <AnswerItem
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

export default QuestionDetailsPage;
