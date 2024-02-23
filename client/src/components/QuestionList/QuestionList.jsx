import React, { useState, useEffect, useCallback } from "react";
import useFetch from "../../hooks/useFetch";
import QuestionSorting from "../QuestionSorting/QuestionSorting";
import QuestionItem from "../QuestionItem/QuestionItem";
import { logInfo } from "../../../../server/src/util/logging.js";
import SearchBarComponent from "../SearchBarComponent/SearchBarComponent.jsx";

const QuestionList = () => {
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/questions",
    fetchQuestions
  );
  console.log(isLoading);
  const [questions, setQuestions] = useState([]);
  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [isSortedByPopularity, setIsSortedByPopularity] = useState(false);
  const [isSortedByTime, setIsSortedByTime] = useState(false);

  function fetchQuestions(res) {
    setQuestions(res.questions);
  }

  useEffect(() => {
    performFetch();
    return () => {
      cancelFetch();
    };
  }, []);

  useEffect(() => {
    setSortedQuestions(questions);
  }, [questions]);

  const runSearch = useCallback(async (term) => {
    await performFetch(null, "/questions?searchTerm=" + term);
  }, []);

  function handleSortByPopularity() {
    const sortedQuestions = [...questions].sort((a, b) => {
      return b.like_counter - a.like_counter;
    });

    logInfo("Sorted Questions:", sortedQuestions);

    const valueToBe = !isSortedByPopularity;
    setIsSortedByPopularity(valueToBe);
    setIsSortedByTime(false);

    if (valueToBe) {
      setSortedQuestions(sortedQuestions);
    } else {
      setSortedQuestions(questions);
    }
  }

  function handleSortByTime() {
    const sortedQuestions = [...questions].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });

    const valueToBe = !isSortedByTime;
    setIsSortedByTime(valueToBe);
    setIsSortedByPopularity(false);

    if (valueToBe) {
      setSortedQuestions(sortedQuestions);
    } else {
      setSortedQuestions(questions);
    }
  }

  if (error) return <h1>{error}</h1>;

  return (
    <div className="question-list">
      <div className="over-question-table">
        <SearchBarComponent runSearch={runSearch} />
        <QuestionSorting
          handleSortByPopularity={handleSortByPopularity}
          handleSortByTime={handleSortByTime}
          isSortedByPopularity={isSortedByPopularity}
          isSortedByTime={isSortedByTime}
        />
      </div>
      <ul>
        {sortedQuestions.map((question) => (
          <li className="questionItem" key={question._id}>
            <QuestionItem question={question} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
