import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PageContent from "./components/PageContent/PageContent";
import Home from "./pages/Home/Home";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LoginPage/LoginPage";
import UserList from "./pages/SignUpPage/UserList";
import QuestionDetails from "./pages/QuestionDetails/QuestionDetails";
import QuestionList from "./pages/QuestionPage/QuestionPage";
import PostQuestionPage from "./pages/PostQuestionPage/PostQuestionPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import UserQuestionsPage from "./pages/UserProfilePage/Questions";
import UserQuestionDetails from "./pages/UserProfilePage/QuestionDetails";

const App = () => {
  return (
    <AuthProvider>
      <>
        <Header />
        <Sidebar />
        <PageContent className="overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
            <Route path="/auth/log-in" element={<LogInPage />} />
            {/*  <Route path="/user-profile" element={<UserProfilePage />} /> */}

            {/* nested user routes */}

            <Route path="/user-profile">
              <Route path="" element={<UserProfilePage />} />
              <Route path="questions">
                <Route path="" element={<UserQuestionsPage />} />
                <Route path=":questionId" element={<UserQuestionDetails />} />
              </Route>
            </Route>

            <Route path="/post-question" element={<PostQuestionPage />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/questions/:id" element={<QuestionDetails />} />
            {/* /question-page was created to test db connection to "questions" collection */}
            <Route path="/question-page" element={<QuestionList />} />
          </Routes>
        </PageContent>
      </>
    </AuthProvider>
  );
};

export default App;
