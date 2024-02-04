import React from "react";
import Box from "@mui/material/Box";
import SearchBar from "../../components/searchbar/SearchBar";
import Sorting from "../sorting/Sorting";
import Question from "./Question";
import "./question.module.css";

const QuestionList = () => {
  const [questions, setQuestions] = React.useState([]);
  const [filteredQuestions, setFilteredQuestions] = React.useState([]);
  const [isSortedByPopularity, setIsSortedByPopularity] = React.useState(false);
  const [isSortedByTime, setIsSortedByTime] = React.useState(false);

  React.useEffect(() => {
    setQuestions([
      {
        id: 1,
        title: "Throw an error preventing a table update in a MySQL trigger",
        excerpt:
          "If I have a trigger before the update on a table, how can I throw an error that prevents the update on that table?",
        module: ["javascript", "react", "nodejs"],
        likes: 16,
        views: 20,
        author: "@username",
        date: new Date("8.9.2023"),
        answers: [
          "Here is one hack that may work. It isn't clean, but it looks like it might work:Essentially, you just try to update a column that doesn't exist.",
          "The hack could be implemented using triggers or using a stored procedure. I describe both options below following the example used by @RuiDC.",
        ],
      },
      {
        id: 2,
        title: "Throw an error preventing a table update in a MySQL trigger",
        excerpt:
          "If I have a trigger before the update on a table, how can I throw an error that prevents the update on that table?",
        module: ["javascript", "react"],
        likes: 17,
        views: 20,
        author: "@username",
        date: new Date("1.10.2023"),
        answers: [
          "Here is one hack that may work. It isn't clean, but it looks like it might work:Essentially, you just try to update a column that doesn't exist.",
          "The hack could be implemented using triggers or using a stored procedure. I describe both options below following the example used by @RuiDC.",
        ],
      },
      {
        id: 3,
        title: "Throw an error preventing a table update in a MySQL trigger",
        excerpt:
          "If I have a trigger before the update on a table, how can I throw an error that prevents the update on that table?",
        module: ["javascript", "react"],
        likes: 1,
        views: 20,
        author: "@username",
        date: new Date("1.1.2024"),
        answers: [
          "Here is one hack that may work. It isn't clean, but it looks like it might work:Essentially, you just try to update a column that doesn't exist.",
          "The hack could be implemented using triggers or using a stored procedure. I describe both options below following the example used by @RuiDC.",
        ],
      },
      {
        id: 4,
        title: "Throw an error preventing a table update in a MySQL trigger",
        excerpt:
          "If I have a trigger before the update on a table, how can I throw an error that prevents the update on that table?",
        module: ["javascript", "react"],
        likes: 90,
        views: 20,
        author: "@username",
        date: new Date("1.8.2022"),
        answers: [
          "Here is one hack that may work. It isn't clean, but it looks like it might work:Essentially, you just try to update a column that doesn't exist.",
          "The hack could be implemented using triggers or using a stored procedure. I describe both options below following the example used by @RuiDC.",
        ],
      },
    ]);
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
