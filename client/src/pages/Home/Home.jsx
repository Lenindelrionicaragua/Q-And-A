import React from "react";
import QuestionList from "../../components/questions/QuestionList";
import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <QuestionList />
    </div>
  );
};

export default Home;
