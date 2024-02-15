import React from "react";
import QuestionList from "../../components/questions/QuestionList";
import PageContent from "../../components/PageContent/PageContent";
import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <PageContent testId={TEST_ID.container}>
      <QuestionList />
    </PageContent>
  );
};

export default Home;
