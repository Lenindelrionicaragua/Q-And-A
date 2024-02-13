import React, { useEffect, useState } from "react";
// import Answer from "../../components/Answer/Answer";
// import CreateAnswer from "../../components/CreateAnswer/CreateAnswer";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// import Question from "../../components/questions/Question";
import "./QuestionDetails.css";
// import { useAuth } from "../../Context/AuthContext";
import { logInfo } from "../../../../server/src/util/logging";

const QuestionDetails = () => {
  const [question, setQuestion] = useState({});
  const { id } = useParams();
  // const { user } = useAuth();

  const {
    performFetch: performFetchQuestions,
    cancelFetch: cancelQuestionFetch,
  } = useFetch(`/questions/${id}`, (response) => setQuestion(response.result));

  useEffect(() => {
    performFetchQuestions();

    return cancelQuestionFetch;
  }, []);

  logInfo(question);

  // const { performFetch: performFetchAnswer } = useFetch(
  //   "/answer/create",
  //   (response) => {
  //     setQuestion((prevQuestion) => ({
  //       ...prevQuestion,
  //       answers: [...prevQuestion.answers, response.answer],
  //     }));
  //   }
  // );

  // const handleCreateAnswer = (answerContent) => {
  //   const answer = {
  //     question_id: id,
  //     answer_content: answerContent,
  //     user_id: user?.id ?? "anonymous",
  //   };

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(answer),
  //   };

  //   performFetchAnswer(options);
  // };

  return (
    <div>
      <div className="question-wrapper">
        {/* <Question question={question} /> */}
      </div>
      {/* {question.answers?.map((answer, i) => (
        <Answer key={i} answer={answer} />
      ))}
      <CreateAnswer handleSubmit={handleCreateAnswer} /> */}
    </div>
  );
};

export default QuestionDetails;
