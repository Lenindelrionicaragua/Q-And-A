import React, { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";

const QuestionList = () => {
  const [questions, setQuestions] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/questions",
    (response) => {
      setQuestions(response.result);
    }
  );

  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, []);

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else {
    content = (
      <>
        <h1>These are the questions:</h1>
        <br></br>
        <ul data-loaded={questions != null}>
          {questions &&
            questions.map((question, index) => {
              return (
                <li key={question._id}>
                  <h3>Question #{index + 1}</h3>
                  <h2>{question.question_title}</h2>
                  <p>{question.content}</p>
                  <h4>{question.author}</h4>
                  <br></br>
                </li>
              );
            })}
        </ul>
      </>
    );
  }

  return <div>{content}</div>;
};

export default QuestionList;
