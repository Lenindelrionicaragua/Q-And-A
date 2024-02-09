import React from "react";
import useFetch from "../../hooks/useFetch";
import Box from "@mui/material/Box";
import SearchBar from "../../components/searchBar/SearchBar";
import Sorting from "../sorting/Sorting";
import Question from "./Question";
import "./question.module.css";

const QuestionList = () => {
  const { isLoading, error, performFetch } = useFetch(
    "/questions",
    fetchQuestions
  );

  const [questions, setQuestions] = React.useState([]);
  const [filteredQuestions, setFilteredQuestions] = React.useState([]);
  const [isSortedByPopularity, setIsSortedByPopularity] = React.useState(false);
  const [isSortedByTime, setIsSortedByTime] = React.useState(false);

  function fetchQuestions(res) {
    setQuestions(res.questions);
  }
  React.useEffect(() => {
    performFetch();
  }, []);

  React.useEffect(() => {
    if (questions.length > 0) {
      runSearch();
    }
  }, [questions]);

  const runSearch = (searchModule) => {
    if (!searchModule) {
      setFilteredQuestions(questions);
      return;
    }
    const updatedQuestions = questions.filter((question) => {
      return question.module.includes(searchModule);
    });

    setFilteredQuestions(updatedQuestions);
  };

  function handleSortByPopularity() {
    const sortedQuestions = [...questions].sort((a, b) => {
      return b.likes - a.likes;
    });
    const valueToBe = !isSortedByPopularity;
    setIsSortedByPopularity(valueToBe);
    setIsSortedByTime(false);

    if (valueToBe) {
      setFilteredQuestions(sortedQuestions);
    } else {
      setFilteredQuestions(questions);
    }
  }

  function handleSortByTime() {
    const sortedQuestions = [...questions].sort((a, b) => {
      const timeA = new Date().getTime() - a.date.getTime();
      const timeB = new Date().getTime() - b.date.getTime();
      return timeA - timeB;
    });

    const valueToBe = !isSortedByTime;
    setIsSortedByTime(valueToBe);
    setIsSortedByPopularity(false);

    if (valueToBe) {
      setFilteredQuestions(sortedQuestions);
    } else {
      setFilteredQuestions(questions);
    }
  }
  //////////////////////////////////////////////////////
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <Box component="section" py={4}>
      <div className="over-question-table">
        <SearchBar runSearch={runSearch} />
        <Sorting
          handleSortByPopularity={handleSortByPopularity}
          handleSortByTime={handleSortByTime}
          isSortedByPopularity={isSortedByPopularity}
          isSortedByTime={isSortedByTime}
        />
      </div>
      <ul>
        {filteredQuestions.map((qus, index) => (
          <Question key={index} question={qus} />
        ))}
      </ul>
    </Box>
  );
};

export default QuestionList;
