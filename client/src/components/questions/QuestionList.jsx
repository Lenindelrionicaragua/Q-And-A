import React from "react";
import Question from "./Question";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SearchBar from "../../components/searchbar/SearchBar";
import Sorting from "../sorting/Sorting";

const QuestionList = () => {
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    setQuestions([
      {
        id: 1,
        title: "Throw an error preventing a table update in a MySQL trigger",
        excerpt:
          "If I have a trigger before the update on a table, how can I throw an error that prevents the update on that table?",
        module: ["javascript", "react", "nodejs"],
        likes: 10,
        views: 20,
        author: "@username",
        date: "1 day",
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
        likes: 10,
        views: 20,
        author: "@username",
        date: "1 day",
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
        likes: 10,
        views: 20,
        author: "@username",
        date: "1 day",
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
        likes: 10,
        views: 20,
        author: "@username",
        date: "1 day",
        answers: [
          "Here is one hack that may work. It isn't clean, but it looks like it might work:Essentially, you just try to update a column that doesn't exist.",
          "The hack could be implemented using triggers or using a stored procedure. I describe both options below following the example used by @RuiDC.",
        ],
      },
    ]);
  }, []);

  const runSearch = (searchModule) => {
    const filteredQuestions = questions.filter((question) => {
      return question.module.includes(searchModule);
    });

    setQuestions(filteredQuestions);
  };

  const handlePopularQuestions = () => {};
  return (
    <Box component="section" py={4}>
      <Container maxWidth="lg">
        <SearchBar runSearch={runSearch} />
        <Sorting handlePopularQuestions={handlePopularQuestions} />
        <ul>
          {questions.map((qus, index) => (
            <Question key={index} question={qus} />
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default QuestionList;
