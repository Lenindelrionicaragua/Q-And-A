import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Navigation/Nav";
import PageContent from "./components/ui/PageContent";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import QuestionDetails from "./pages/QuestionDetails";

const App = () => {
  return (
    <>
      <Header />
      <Nav />
      <h1>Q & A</h1>
      <PageContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" />
          <Route path="/sign-up" />
          <Route path="/ask-a-question" />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/:id" element={<QuestionDetails />} />
        </Routes>
      </PageContent>
    </>
  );
};

export default App;
