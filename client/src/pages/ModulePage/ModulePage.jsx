// ModulePage.js
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import QuestionItem from "../../components/QuestionItem/QuestionItem";
import PageContent from "../../components/PageContent/PageContent";

const ModulePage = ({ moduleName }) => {
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/questions",
    fetchQuestions
  );

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    performFetch(
      null,
      `/questions?searchTerm=${encodeURIComponent(moduleName)}`
    );
    return () => {
      cancelFetch();
    };
  }, [moduleName]);

  function fetchQuestions(res) {
    if (res.error) {
      console.error("Error fetching questions:", res.error);
    } else {
      setQuestions(res.questions);
    }
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <PageContent>
      <h1>
        Questions on the topic:{" "}
        <span style={{ color: "#4E5289" }}>{moduleName}</span>
      </h1>
      <br></br>
      <div className="question-list" id={moduleName}>
        {questions.map((question, index) => (
          <QuestionItem key={index} question={question} />
        ))}
      </div>
    </PageContent>
  );
};

export default ModulePage;
