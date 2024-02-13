import React from "react";
import useFetch from "../../hooks/useFetch";
import Box from "@mui/material/Box";
import SearchBar from "../../components/searchbar/SearchBar.jsx";
import Sorting from "../sorting/Sorting";
import Question from "./Question";
import "./question.module.css";
import { logInfo } from "../../../../server/src/util/logging.js";

const QuestionList = () => {
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
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
    return () => {
      cancelFetch();
    };
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
      // Convert both the module_ids and searchModule to lowercase
      const lowerCaseModuleIds = question.module_ids.map((moduleId) =>
        moduleId.toLowerCase()
      );
      const lowerCaseSearchModule = searchModule.toLowerCase();

      // Check if the lower case version of searchModule exists in lower case module_ids
      return lowerCaseModuleIds.includes(lowerCaseSearchModule);
    });

    setFilteredQuestions(updatedQuestions);
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
      setFilteredQuestions(sortedQuestions);
    } else {
      setFilteredQuestions(questions);
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
      setFilteredQuestions(sortedQuestions);
    } else {
      setFilteredQuestions(questions);
    }
  }

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
