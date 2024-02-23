import React from "react";
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

  const [questions, setQuestions] = React.useState([]);
  const [sortedQuestions, setSortedQuestions] = React.useState([]);

  const [isSortedByPopularity, setIsSortedByPopularity] = React.useState(false);
  const [isSortedByTime, setIsSortedByTime] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  function fetchQuestions(res) {
    setQuestions(res.questions);
  }

  React.useEffect(() => {
    performFetch();
    return () => {
      cancelFetch();
    };
  }, []);

  React.useEffect(() => {
    setSortedQuestions(questions);
  }, [questions]);

  const runSearch = async (term) => {
    await performFetch(null, "/questions?searchTerm=" + term);
    setSearchTerm(term);
  };

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

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="question-list">
      <div className="over-question-table">
        <SearchBarComponent searchTerm={searchTerm} runSearch={runSearch} />
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
            <QuestionItem question={question} onDelete={setQuestions} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
