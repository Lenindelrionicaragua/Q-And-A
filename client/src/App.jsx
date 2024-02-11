import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Navigation/Nav";
import PageContent from "./components/ui/PageContent";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUpPage/SignUpPage";
import UserList from "./pages/SignUpPage/UserList";
import QuestionDetails from "./pages/QuestionDetails";
import LoginPage from "./pages/LoginPage/LoginPage";
import QuestionList from "./pages/QuestionPage/QuestionPage";
import PostQuestionPage from "./pages/PostQuestionPage/PostQuestionPage";

const App = () => {
  return (
    <AuthProvider>
      <>
        <Header />
        <Nav />
        <PageContent className="overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/log-in" element={<LoginPage />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/post-question" element={<PostQuestionPage />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/:id" element={<QuestionDetails />} />
            {/* /question-page was created to test db connection to "questions" collection */}
            <Route path="/question-page" element={<QuestionList />} />
          </Routes>
        </PageContent>
      </>
    </AuthProvider>
  );
};

export default App;
